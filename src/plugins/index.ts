import { FastifyInstance } from "fastify";
import diConfig from "./di.config";
import swaggerConfig from "./swagger.config";
const plugins= (server: FastifyInstance) =>{
    diConfig(server)
    swaggerConfig(server)
}

export default plugins