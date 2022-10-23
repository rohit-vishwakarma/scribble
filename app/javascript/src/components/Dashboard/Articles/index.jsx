import React, { useState, useEffect } from "react";

import { PageLoader } from "neetoui";
import { Container } from "neetoui/layouts";

import articlesApi from "apis/articles";
import categoriesApi from "apis/categories";

import { ColumnsListItems } from "./constants";
import EmptyState from "./EmptyState";
import Header from "./Header";
import MenuBar from "./Menu";
import Table from "./Table";
import { searchArticlesByTitle } from "./utils";

const Articles = () => {
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [columnsList, setColumnsList] = useState(ColumnsListItems);
  const [articlesCount, setArticlesCount] = useState({});
  const [searchArticleTerm, setSearchArticleTerm] = useState("");

  const handleCheckedColumns = selectedIdx => {
    const items = ColumnsListItems;
    const selectedItem = items[selectedIdx];
    selectedItem.checked = !selectedItem.checked;
    setColumnsList([...items]);
  };

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const {
        data: { articles, draft, published },
      } = await articlesApi.fetch();
      setArticles(articles);
      setArticlesCount({ all: draft + published, draft, published });
    } catch (error) {
      logger.error(error);
    }
  };

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const { data } = await categoriesApi.fetch();
      setCategories(data);
    } catch (error) {
      logger.error(error);
    }
  };

  const fetchArticlesAndCategories = async () => {
    await Promise.all([fetchArticles(), fetchCategories()]);
    setLoading(false);
  };

  useEffect(() => {
    fetchArticlesAndCategories();
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <div className="flex">
      <MenuBar
        articles={articles}
        articlesCount={articlesCount}
        categories={categories}
        refetch={fetchArticlesAndCategories}
        setArticles={setArticles}
      />
      <Container>
        <Header
          columnsList={columnsList}
          handleCheckedColumns={handleCheckedColumns}
          searchArticleTerm={searchArticleTerm}
          setSearchArticleTerm={setSearchArticleTerm}
        />
        {articles.length ? (
          <div className="flex w-full flex-col">
            <Table
              articles={searchArticlesByTitle(articles, searchArticleTerm)}
              refetch={fetchArticlesAndCategories}
            />
          </div>
        ) : (
          <EmptyState
            primaryActionLabel="Add New Article"
            subtitle="Add some articles"
            title="Looks like you don't have any articles!"
          />
        )}
      </Container>
    </div>
  );
};

export default Articles;
