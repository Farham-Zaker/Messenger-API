import Fastify from "fastify";
const server = Fastify({ logger: false });


import plugins from "./plugins/index"
plugins(server)

import routes from "./routes/index";
server.register(routes);

import config from "./config/index";
try {
  server.listen({ port: config.port });
  console.log(`Server is running on port ${config.port}`);
} catch (error) {
  server.log.error(error);
  process.exit(1);
}
