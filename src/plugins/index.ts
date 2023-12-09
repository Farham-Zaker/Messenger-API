import { FastifyInstance } from "fastify";
import diConfig from "./di.config";

const plugins= (server: FastifyInstance) =>{
    diConfig(server)
}

export default plugins