const databaseSelector = (mainTable: string, selectedFields: any) => {
  let selects: Record<string, any> = {};

  Object.keys(selectedFields).map((model: string) => {
    selectedFields[model].map((fieldName: string) => {
      if (model == mainTable) {
        return (selects[fieldName] = true);
      }
      return (selects[model] = {
        ...selects[fieldName],
        select: {
          ...selects[model]?.select,
          [fieldName]: true,
        },
      });
    });
  });
  return selects;
};

export default databaseSelector;
