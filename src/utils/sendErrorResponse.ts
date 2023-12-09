import { FastifyReply } from "fastify";

const sendErrorResponse = (reply: FastifyReply, error: unknown) => {
  if (error instanceof Error) {
    throw new Error(error.message);
  } else {
    throw new Error("An unknown error occurred.");
  }
};

export default sendErrorResponse;
