import { FastifyRequest, FastifyReply, HookHandlerDoneFunction } from "fastify";
import sendResponse from "../utils/sendResponse";

type ParametersType = {
  target: string;
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
  };
};

export default validate;
