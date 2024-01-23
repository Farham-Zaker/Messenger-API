const prismaWhereInputExtractor = <T extends {}>(condition: T) => {
  const where: any = {};
  const keys = Object.keys(condition) as Array<keyof T>;

  keys.map((key) => {
    const conditionValue = condition[key];
    if (
      typeof conditionValue === "object" &&
      conditionValue &&
      "relation" in conditionValue
    ) {
      const [k, v]: any = Object.entries(conditionValue).map(([k, value]) => {
        if (k !== "relation") {
          return { [k]: value };
        }
      });

      return (where[key] = {
        every: {
          [k]: v,
        },
      });
    }
    return (where[key] = conditionValue);
  });

  return where;
};

export default prismaWhereInputExtractor;
