import { FastifyReply } from "fastify";

type ResponseTypes = {
  statusCode: number;
  status: string;
  [key: string]: any;
};
const sendResponse = (reply: FastifyReply, response: ResponseTypes) => {
  reply.code(response.statusCode).send(response);
};

export default sendResponse;
