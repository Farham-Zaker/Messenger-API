import { FastifyPluginCallback } from "fastify";
import validate from "../middlewares/validation.middleware";
import isLogged from "../middlewares/islogged";
import userControllers from "../controllers/user.controllers";
import { setPasswordShcema } from "../schemas/user.schemas";
const userRoutePlugin: FastifyPluginCallback = async (
  fastify,
  options,
  done
) => {
  fastify.route({
    url: "/set-password",
    preHandler: [
      isLogged,
      validate({ target: "body", schema: setPasswordShcema }),
    ],
    method: "PUT",
    handler: userControllers.setPassword,
    schema: {
      hide: true,
    },
  });
};

export default userRoutePlugin;
