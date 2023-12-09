import prismaServices from "../prisma/prismaServices";
import databaseSelector from "../utils/databaseSelector";
import {
  FindAreaCodeTypes,
  FindAreaCodePrametersTypes,
} from "../types/areaCodeServices.type";

class AreaCodeServices {
  async findOne({
    condition,
    selectedFields,
  }: FindAreaCodePrametersTypes): Promise<FindAreaCodeTypes | null> {
    const areaCode: FindAreaCodeTypes | null = await prismaServices.area_codes.findFirst({
        where: condition,
        select: databaseSelector("areaCodes", selectedFields),
      });
    return areaCode;
  }
}

export default AreaCodeServices;
