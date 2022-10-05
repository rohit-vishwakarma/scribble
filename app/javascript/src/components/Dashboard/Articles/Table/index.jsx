import React, { useState } from "react";

import { Table as NeetoUITable } from "neetoui";

import { buildArticleTableColumnData } from "./utils";

import DeleteAlert from "../DeleteAlert";

const Table = ({ articles, refetch }) => {
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [selectedDeleteArticle, setSelectedDeleteArticle] = useState({});

  const handleDelete = selectedArticle => {
    setSelectedDeleteArticle(selectedArticle);
    setShowDeleteAlert(prevState => !prevState);
  };

  return (
    <div className="w-full">
      <NeetoUITable
        columnData={buildArticleTableColumnData(handleDelete)}
        rowData={articles}
      />
      {showDeleteAlert && (
        <DeleteAlert
          refetch={refetch}
          selectedDeleteArticle={selectedDeleteArticle}
          setSelectedDeleteArticle={setSelectedDeleteArticle}
          onClose={() => setShowDeleteAlert(false)}
        />
      )}
    </div>
  );
};

export default Table;
