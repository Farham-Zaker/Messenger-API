import prismaServices from "../prisma/prismaServices";
import {
  CreateMediaParamersTypes,
  CreatedMediaType,
  FindAllMediaParametersTypes,
  FindOneMediaPrametersTypes,
  MediaType,
} from "../types/mediaServices.types";
import databaseSelector from "../utils/databaseSelector";

class MediaServices {
  async createMany(data: CreateMediaParamersTypes[]): Promise<void> {
    await prismaServices.media.createMany({
      data,
    });
  }
  async findAll({
    condition,
    selectedFields,
  }: FindAllMediaParametersTypes): Promise<MediaType[]> {
    const allMedia: MediaType[] = await prismaServices.media.findMany({
      where: condition,
      select: databaseSelector("media", selectedFields),
    });
    return allMedia;
  }
  async findOneMedia({
    condition,
    selectedFields,
  }: FindOneMediaPrametersTypes): Promise<MediaType | null> {
    const media: MediaType | null = await prismaServices.media.findFirst({
      where: condition,
      select: databaseSelector("media", selectedFields),
    });
    return media;
  }
  async deleteMedia(condition: { mediaId: string }): Promise<void> {
    await prismaServices.media.delete({ where: condition });
  }
}
export default MediaServices;
