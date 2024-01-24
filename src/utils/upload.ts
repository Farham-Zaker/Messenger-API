import sendResponse from "./sendResponse";
import { FastifyReply, FastifyRequest } from "fastify";
import path from "path";
import pump from "pump";
import fs from "fs";
type ParametersTypes = {
  request: FastifyRequest;
  reply: FastifyReply;
  acceptedFormats: string[];
  uploadDestination: string;
  desiredName: string;
};
const upload = async ({
  request,
  reply,
  acceptedFormats,
  uploadDestination,
  desiredName,
}: ParametersTypes) => {
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
  const isFileFormatInvalid: boolean = !!acceptedFormats.find(
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
    upload: "success",
    filePath: path.join(__dirname,"../../",uploadPath),
  };
};

export default upload;
