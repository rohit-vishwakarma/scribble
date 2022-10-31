import React, { useEffect, useState } from "react";

import { Table, PageLoader } from "neetoui";

import articlesApi from "apis/articles";

import { ArticleColumnsData } from "./utils";

const Analytics = () => {
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const {
        data: { published_articles: publishedArticles },
      } = await articlesApi.fetch();
      setArticles(publishedArticles);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

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
        currentPageNumber={currentPageNumber}
        defaultPageSize={10}
        handlePageChange={e => setCurrentPageNumber(e)}
        rowData={articles}
      />
    </div>
  );
};

export default Analytics;
