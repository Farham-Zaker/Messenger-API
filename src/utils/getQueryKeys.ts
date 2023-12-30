function getQueryKeys<T extends {}>(requestQuery: T): string[] {
  const selectedFieldsInQuery: string[] = Object.keys(requestQuery).filter(
    (key) => requestQuery[key as keyof typeof requestQuery] === "true"
  );
  return selectedFieldsInQuery;
}
export default getQueryKeys;
