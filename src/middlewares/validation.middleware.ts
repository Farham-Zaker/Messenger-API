import { FastifyRequest, FastifyReply, HookHandlerDoneFunction } from "fastify";
import sendResponse from "../utils/sendResponse";

type ParametersType = {
  target: "body" | "query"
  schema: any;
};
const validate = ({ target, schema }: ParametersType) => {
  return async (
    request: FastifyRequest,
    reply: FastifyReply,
    done: HookHandlerDoneFunction
  ) =>  {
    let requestData;
    if (target === "body") {
      requestData = request.body;
    } else if (target === "query") {
      requestData = request.query;
    } 
    
    if (!requestData) {
      return sendResponse(reply, {
        status: "error",
        statusCode: 400,
        message: `Provide the required information in the request ${target}.`,
      });
    }
    const { error } = schema.validate(requestData);
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
        in: target,
        errors,
      });
    }
  };
};

export default validate;
