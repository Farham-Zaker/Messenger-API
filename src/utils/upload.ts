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
  if (uploadType === "multiple") {
    const uploadedFiles = [];
    const files = request.files();
    for await (let part of files) {
      const uploadedFileName: string[] = part.filename.split(".");
      const fileFormat: string = uploadedFileName[uploadedFileName.length - 1];

      // Check if file format is invalid or not
      const isFileFormatValid: boolean = !!acceptableFormats.find(
        (format) => format === fileFormat
      );
      if (!isFileFormatValid) {
        return sendResponse(reply, {
          status: "error",
          statusCode: 415,
          message: `Unsupported Media Type. ${part.filename} format is invalid.`,
        });
      }

      // Create folder if upload destination is not exist
      if (!fs.existsSync(destination)) {
        fs.mkdirSync(destination);
      }
      const uploadPath: string = path.join(
        destination,
        category || "",
        uploadFileName,
        `${uuid()}.${fileFormat}`
      );

      // Create folder if a folder with category name did not exist
      const uploadPathWithCategoryName = path.join(destination, category || "");
      if (!fs.existsSync(uploadPathWithCategoryName)) {
        fs.mkdirSync(uploadPathWithCategoryName);
      }

      // Create folder if a folder did not exist for each private chat or channel or group
      const uploadPathWithCategoryNameAndID = path.join(
        destination,
        category || "",
        uploadFileName
      );
      if (!fs.existsSync(uploadPathWithCategoryNameAndID)) {
        fs.mkdirSync(uploadPathWithCategoryNameAndID);
      }
      
      // Upload
      await pump(part.file, fs.createWriteStream(uploadPath));

      uploadedFiles.push({
        status: "success",
        fileName: `${uuid()}.${fileFormat}`,
        filePath: path.join(__dirname, "../../", uploadPath),
        fileType: fileFormat,
      });
    }
    return uploadedFiles;
  } else if (uploadType === "single") {
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
  }
};

export default upload;
