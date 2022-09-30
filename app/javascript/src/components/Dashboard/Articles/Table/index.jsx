import React from "react";

import { Table as NeetoUITable } from "neetoui";

import { buildArticleTableColumnData } from "./utils";

const Table = ({ articles }) => (
  <div className="w-full">
    <NeetoUITable
      columnData={buildArticleTableColumnData()}
      rowData={articles}
    />
  </div>
);

export default Table;
