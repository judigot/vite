export default (
  cellValue: Date | string | Array<string | number | object> | object,
  columnName: string,
  cell: {
    column: { columnDef: { cell: Function } };
    // id: any;
    // row: any;
    // getValue: any;
    // renderValue: any;
    // getContext: any;
    // getIsGrouped: any;
    // getIsPlaceholder: any;
    // getIsAggregated: any;
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
