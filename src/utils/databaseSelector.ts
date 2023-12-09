const databaseSelector = (mainTable: string, selectedFields: any) => {
  let selects: Record<string, any> = {};

  Object.keys(selectedFields).map((tableName: string) => {
    selectedFields[tableName].map((fieldName: string) => {
      if (tableName == mainTable) {
        return (selects[fieldName] = true);
      }
      return (selects[tableName] = {
        ...selects[fieldName],
        select: {
          ...selects[tableName]?.select,
          [fieldName]: true,
        },
      });
    });
  });
  return selects;
};

export default databaseSelector;
