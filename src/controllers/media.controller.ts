import { FastifyReply, FastifyRequest } from "fastify";
import sendErrorResponse from "../utils/sendErrorResponse";
import upload from "../utils/upload";
import {
  GetAllMediaRequestQueryTypes,
  GetMediaByIdRequestQueryTypes,
  MediaType,
  SendMediaRequestQueryTypes,
  UploadedFileTypes,
} from "../types/mediaControllers.types";
import MediaServices from "../services/media.services";
import { v4 as uuid } from "uuid";
import sendResponse from "../utils/sendResponse";
import getQueryKeys from "../utils/getQueryKeys";

export default new (class mediaController {
  async sendMedia(
    request: FastifyRequest<{ Querystring: SendMediaRequestQueryTypes }>,
    reply: FastifyReply
  ) {
    const { privateChatId, channelId, groupId } = request.query;
    try {
      const mediaServices: MediaServices =
        request.diScope.resolve("mediaServices");

      let category;
      if (privateChatId) category = "privateChats";
      if (channelId) category = "channels";
      if (groupId) category = "groups";

      let uploadFileName;
      if (privateChatId) uploadFileName = privateChatId;
      if (channelId) uploadFileName = channelId;
      if (groupId) uploadFileName = groupId;

      const uploadedFiles = (await upload({
        request,
        reply,
        uploadType: "multiple",
        category,
        acceptableFormats: ["png"],
        uploadFileName: uploadFileName as string,
        destination: "./src/uploads",
      })) as UploadedFileTypes[];

      const createMediaData = uploadedFiles.map((file) => {
        return {
          mediaId: uuid(),
          filePath: file.filePath,
          fileType: file.fileType,
          createdAt: new Date(),
          updatedAt: new Date(),
          privateChatId,
          channelId,
          groupId,
        };
      });

      await mediaServices.createMany(createMediaData);

      return sendResponse(reply, {
        status: "success",
        statusCode: 201,
        message: "The target media sent successfully.",
      });
    } catch (error) {
      return sendErrorResponse(reply, error);
    }
  }
  async getAllMedia(
    request: FastifyRequest<{ Querystring: GetAllMediaRequestQueryTypes }>,
    reply: FastifyReply
  ) {
    const { privateChatId, groupId, channelId } = request.query;
    const keys = getQueryKeys(request.query);
    try {
      const mediaServices: MediaServices =
        request.diScope.resolve("mediaServices");

      const allMedia: MediaType[] = await mediaServices.findAll({
        condition: { privateChatId, groupId, channelId },
        selectedFields: {
          media: [
            "mediaId",
            "filePath",
            "fileType",
            "createdAt",
            "updatedAt",
            "messageId",
            ...keys,
          ],
        },
      });
      return sendResponse(reply, {
        status: "success",
        statusCode: 200,
        allMedia,
      });
    } catch (error) {
      return sendErrorResponse(reply, error);
    }
  }
  async getMediaById(
    request: FastifyRequest<{
      Params: { mediaId: string };
      Querystring: GetMediaByIdRequestQueryTypes;
    }>,
    reply: FastifyReply
  ) {
    const { mediaId } = request.params;

    const keys = getQueryKeys<GetMediaByIdRequestQueryTypes>(request.query);

    try {
      const mediaServices: MediaServices =
        request.diScope.resolve("mediaServices");

      const media: MediaType | null = await mediaServices.findOneMedia({
        condition: {
          mediaId,
        },
        selectedFields: {
          media: [
            "mediaId",
            "filePath",
            "fileType",
            "createdAt",
            "updatedAt",
            "privateChatId",
            "groupId",
            "channelId",
            "messageId",
            ...keys,
          ],
        },
      });

      if (!media) {
        return sendResponse(reply, {
          status: "error",
          statusCode: 404,
          message: "There is no any media with such ID.",
        });
      }

      return sendResponse(reply, {
        status: "success",
        statusCode: 200,
        media,
      });
    } catch (error) {
      return sendErrorResponse(reply, error);
    }
  }
  async delete(
    request: FastifyRequest<{ Params: { mediaId: string } }>,
    reply: FastifyReply
  ) {
    const { mediaId } = request.params;
    try {
      const mediaServices: MediaServices =
        request.diScope.resolve("mediaServices");

      await mediaServices.deleteMedia({ mediaId });

      return sendResponse(reply, {
        status: "success",
        statusCode: 200,
        message: "The target media deleted successfully.",
      });
    } catch (error) {
      return sendErrorResponse(reply, error);
    }
  }
})();
