import React from "react";

import Table from "./Table";

const List = ({ articles }) => (
  <div className="flex w-full flex-col">
    <Table articles={articles} />
  </div>
);

export default List;
