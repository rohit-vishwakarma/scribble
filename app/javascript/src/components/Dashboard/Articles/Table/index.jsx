import React, { useState } from "react";

import { Table as NeetoUITable, Typography } from "neetoui";

import { buildArticleTableColumnData } from "./utils";

import DeleteAlert from "../DeleteAlert";

const Table = ({ articles, refetch }) => {
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [selectedDeleteArticle, setSelectedDeleteArticle] = useState({});
  const [currentPageNumber, setCurrentPageNumber] = useState(1);

  const handleDelete = selectedArticle => {
    setSelectedDeleteArticle(selectedArticle);
    setShowDeleteAlert(prevState => !prevState);
  };

  return (
    <>
      <Typography className="pb-6" style="h4">
        {articles.length}
        {articles.length > 1 ? " Articles" : " Article"}
      </Typography>
      <div className="w-full">
        <NeetoUITable
          allowRowClick={false}
          columnData={buildArticleTableColumnData(handleDelete)}
          currentPageNumber={currentPageNumber}
          defaultPageSize={10}
          handlePageChange={e => setCurrentPageNumber(e)}
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
    </>
  );
};

export default Table;
