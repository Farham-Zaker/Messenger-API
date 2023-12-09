import { FastifyRequest, FastifyReply, HookHandlerDoneFunction } from "fastify";
import sendResponse from "../utils/sendResponse";

const validate = (schema: any) => {
  return (
    request: FastifyRequest,
    reply: FastifyReply,
    done: HookHandlerDoneFunction
  ) => {
    const { error } = schema.validate(request.body);
    if (error) {
      const errors = error.details.map((detail: any) => {
        return {
          message: detail.message,
          path: detail.path.join("."),
        };
      });
      return sendResponse(reply, {
        status: "error",
        statusCode: 400,
        errors,
      });
    } else {
      done();
    }
  };
};

export default validate;
