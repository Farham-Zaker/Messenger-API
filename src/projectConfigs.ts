import { FastifyInstance } from "fastify";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";

const projectConfigs = (server: FastifyInstance) => {
  const swaggerOptions = {
    swagger: {
      info: {
        title: "Chat App",
        version: "1.0.0",
      },
      host: "localhost",
      consumes: ["application/json"],
      produces: ["application/json"],
      tags: [],
    },
  };
  const swaggerUiOptions = {
    routePrefix: "/docs",
    exposeRoute: true,
  };

  server.register(fastifySwagger, swaggerOptions);
  server.register(fastifySwaggerUi, swaggerUiOptions);
};

export default projectConfigs;
