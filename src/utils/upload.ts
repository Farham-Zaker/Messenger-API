import sendResponse from "./sendResponse";
import { FastifyReply, FastifyRequest } from "fastify";
import path from "path";
import pump from "pump";
import fs from "fs";
import { v4 as uuid } from "uuid";
type ParametersTypes = {
  request: FastifyRequest;
  reply: FastifyReply;
  acceptableFormats: string[];
  uploadType: "single" | "multiple";
  category?: string;
  destination: string;
  uploadFileName: string;
};

type FunctionType = {
  status: string;
  filePath: string;
  fileName: string;
};

const upload = async ({
  request,
  reply,
  uploadType,
  category,
  acceptableFormats,
  destination,
  uploadFileName,
}: ParametersTypes): Promise<FunctionType | FunctionType[] | void> => {
  
    const file = await request.file();

    // Check file uploaded or not.
    if (!file) {
      return sendResponse(reply, {
        status: "error",
        statusCode: 400,
        message: "No file uplouded.",
      });
    }

    // Check the format of file.
    const fileName: string[] = file.filename.split(".");
    const fileFromat: string = fileName[fileName.length - 1];
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

    if (!fs.existsSync(destination)) {
      fs.mkdirSync(destination);
    }
    const uploadPath = path.join(
      destination,
      `${uploadFileName}.${fileFromat}`
    );

    await pump(file.file, fs.createWriteStream(uploadPath));
    return {
      status: "success",
      fileName: `${uploadFileName}.${fileFromat}`,
      filePath: path.join(__dirname, "../../", uploadPath),
    };

};

export default upload;
