import { FastifyInstance } from "fastify";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import configs from "../config";
import authDocs from "../docs/auth.docs";

const swaggerConfig = (server: FastifyInstance) => {
  const swaggerOptions = {
    swagger: {
      info: {
        title: "Real-Time Messaging API",
        description:
          "Welcome to our real-time messaging API built using Node.js, TypeScript, and Socket.IO. This project empowers developers to integrate robust messaging functionality into their applications. Leveraging the power of Socket.IO, our API enables seamless, bidirectional communication between clients and the server, facilitating instant message delivery and real-time updates.",
        version: "1.0.0",
      },
      host: configs.host,
      paths: {
        ...authDocs,
      },
    },
    exposeRoute: false,
  };
  const swaggerUiOptions = {
    routePrefix: "/docs",
    exposeRoute: false,
  };

  server.register(fastifySwagger, swaggerOptions);
  server.register(fastifySwaggerUi, swaggerUiOptions);
};

export default swaggerConfig;
