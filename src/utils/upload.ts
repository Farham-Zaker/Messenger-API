import sendResponse from "./sendResponse";
import { FastifyReply, FastifyRequest } from "fastify";
import path from "path";
import pump from "pump";
import fs from "fs";
type ParametersTypes = {
  request: FastifyRequest;
  reply: FastifyReply;
  acceptableFormats: string[];
  uploadDestination: string;
  desiredName: string;
};
type FunctionType = {
  uploadStatus: string;
  filePath: string;
};
const upload = async ({
  request,
  reply,
  acceptableFormats,
  uploadDestination,
  desiredName,
}: ParametersTypes): Promise<FunctionType | void> => {
  const file = await request.file();

  //   Check file uploaded or not.
  if (!file) {
    return sendResponse(reply, {
      status: "error",
      statusCode: 400,
      message: "No file uplouded.",
    });
  }

  //   Check the format of file.
  const fileNmae: string[] = file.filename.split(".");
  const fileFromat = fileNmae[fileNmae.length - 1];
  const isFileFormatInvalid: boolean = !!acceptableFormats.find(
    (format) => format === fileFromat
  );
  if (!isFileFormatInvalid) {
    return sendResponse(reply, {
      status: "error",
      statusCode: 415,
      message: "Unsupported Media Type. The file format is invalid.",
    });
  }

  if (!fs.existsSync(uploadDestination)) {
    fs.mkdirSync(uploadDestination);
  }
  const uploadPath = path.join(
    uploadDestination,
    `${desiredName}.${fileFromat}`
  );

  await pump(file.file, fs.createWriteStream(uploadPath));
  return {
    uploadStatus: "success",
    filePath: path.join(__dirname, "../../", uploadPath),
  };
};

export default upload;
