import { FastifyReply } from "fastify";

type ResponseTypes = {
  statusCode: number;
  status: string;
  error?: string;
  message?: string;
  [key: string]: any;
};
const sendResponse = (reply: FastifyReply, response: ResponseTypes) => {
  reply.code(response.statusCode).send(response);
};

export default sendResponse;
