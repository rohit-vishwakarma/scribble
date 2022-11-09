import React, { useEffect, useState } from "react";

import { Table, PageLoader, Pagination } from "neetoui";

import { articlesApi } from "apis/admin";

import { ArticleColumnsData, ArticleVisitsColumnData } from "./utils";

const Analytics = () => {
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const {
        data: { articles },
      } = await articlesApi.fetchPublished({ page_no: currentPageNumber });
      setArticles(articles);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, [currentPageNumber]);

  if (loading) {
    return (
      <div className="h-screen w-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <div className="mx-64 mt-8">
      <Table
        allowRowClick={false}
        columnData={ArticleColumnsData}
        rowData={articles}
        expandable={{
          expandedRowRender: record => (
            <div className="m-0 w-64 pl-8">
              <Table
                allowRowClick={false}
                columnData={ArticleVisitsColumnData}
                rowData={[record]}
              />
            </div>
          ),
        }}
      />
      <Pagination
        className="pt-4"
        navigate={e => setCurrentPageNumber(e)}
        pageNo={currentPageNumber}
        pageSize={10}
        count={
          articles.length !== 10
            ? currentPageNumber * 10 - 1
            : currentPageNumber * 10 + 1
        }
      />
    </div>
  );
};

export default Analytics;
