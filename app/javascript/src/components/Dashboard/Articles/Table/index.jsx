import React from "react";

import { Table as NeetoUITable } from "neetoui";

import { buildArticleTableColumnData } from "./utils";

import { ARTICLE_DETAILS_DATA } from "../constants";

const Table = () => (
  <div className="w-full">
    <NeetoUITable
      columnData={buildArticleTableColumnData}
      rowData={ARTICLE_DETAILS_DATA}
      onRowClick={() => {}}
      onRowSelect={() => {}}
    />
  </div>
);

export default Table;
