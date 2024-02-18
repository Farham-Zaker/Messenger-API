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
    await prismaServices.medias.createMany({
      data,
    });
  }
  async findAll({
    condition,
    selectedFields,
  }: FindAllMediaParametersTypes): Promise<MediaType[]> {
    const allMedia: MediaType[] = await prismaServices.medias.findMany({
      where: condition,
      select: databaseSelector("medias", selectedFields),
    });
    return allMedia;
  }
  async findOneMedia({
    condition,
    selectedFields,
  }: FindOneMediaPrametersTypes): Promise<MediaType | null> {
    const media: MediaType | null = await prismaServices.medias.findFirst({
      where: condition,
      select: databaseSelector("medias", selectedFields),
    });
    return media;
  }
}
export default MediaServices;
