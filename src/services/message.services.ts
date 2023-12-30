import { Prisma } from "@prisma/client";
import prismaServices from "../prisma/prismaServices";
import databaseSelector from "../utils/getQueryKeys";

class messageServices {
  async delete(condition: Prisma.messagesWhereInput): Promise<void> {
    await prismaServices.messages.deleteMany({
      where: condition,
    });
  }
}

export default messageServices;
