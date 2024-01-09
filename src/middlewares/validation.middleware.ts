import { FastifyRequest, FastifyReply, HookHandlerDoneFunction } from "fastify";
import sendResponse from "../utils/sendResponse";

type ParametersType = {
  target: "body" | "query";
  schema: any;
};
const validate = ({ target, schema }: ParametersType) => {
  return (
    request: FastifyRequest,
    reply: FastifyReply,
    done: HookHandlerDoneFunction
  ) => {
    if (target === "body") {
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
          in: "body",
          errors,
        });
      }
      return done();
    }

    if (target === "query") {
      const { error } = schema.validate(request.query);

      if (error) {
        const errors = error.details.map((detail: any) => {
          return {
            message: detail.type,
            path: detail.path.join("."),
          };
        });
        return sendResponse(reply, {
          status: "error",
          statusCode: 400,
          in: "query",
          errors,
        });
      }
      return done();
    }
  };
};

export default validate;
