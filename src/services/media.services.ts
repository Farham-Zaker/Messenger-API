import prismaServices from "../prisma/prismaServices";
import {
  CreateMediaParamersTypes,
  CreatedMediaType,
} from "../types/mediaServices.types";

class MediaServices {
  async createMany(data: CreateMediaParamersTypes[]): Promise<void> {
    await prismaServices.medias.createMany({
      data,
    });
  }
}
export default MediaServices;
