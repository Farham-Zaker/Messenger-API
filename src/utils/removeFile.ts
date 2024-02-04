import { FastifyReply } from "fastify";
import fs from "fs";
import path from "path";
import sendResponse from "./sendResponse";
import sendErrorResponse from "./sendErrorResponse";

type ParametersTypes = {
  reply: FastifyReply;
  directoryPath: string;
  nameStartWith: string;
};

const removeFile = ({
  reply,
  directoryPath,
  nameStartWith,
}: ParametersTypes) => {
  // Read all file in the target directory
  fs.readdir(directoryPath, (error, files) => {
    // Find files that start with target name
    const targetFiles: string[] = files.filter((file) => {
      return file.startsWith(nameStartWith);
    });
    // Send response if there is no any file with such name
    if (targetFiles.length === 0) {
      return sendResponse(reply, {
        status: "error",
        statusCode: 404,
        message: `There is no any file thet start with '${nameStartWith}'.`,
      });
    }

    if (error) sendErrorResponse(reply, error);

    // Delete file
    targetFiles.forEach((targetFile) => {
      // Target file directory for removing
      const filePath: string = path.join(directoryPath, targetFile);
      fs.unlink(filePath, (error) => {
        if (error) sendErrorResponse(reply, error);
      });
    });
  });
};

export default removeFile;
