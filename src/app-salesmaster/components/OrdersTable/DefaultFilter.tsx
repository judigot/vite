export default (
  cellValue: Date | string | Array<string | number | object> | object,
  columnName: string,
  cell: {
    column: { columnDef: { cell: Function } };
    // id: object; row: object; getValue: object; renderValue: object; getContext: object; getIsGrouped: object; getIsPlaceholder: object; getIsAggregated: object;
  }
) => {
  if (cellValue.constructor.name === "Date") {
    return cellValue.toString();
  }
  if (["Array", "Object"].includes(cellValue.constructor.name)) {
    return JSON.stringify(cellValue);
  }
  return cellValue;
};
