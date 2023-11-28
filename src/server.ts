import Fastify from "fastify";
const server = Fastify({ logger: false });

import roots from "./root";
server.register(roots);

import config from "./config/index";
const start = async () => {
  try {
    await server.listen({ port: config.port });
    console.log(`Server is running on port ${config.port}`);
  } catch (error) {
    server.log.error(error);
    process.exit(1);
  }
};

start();
