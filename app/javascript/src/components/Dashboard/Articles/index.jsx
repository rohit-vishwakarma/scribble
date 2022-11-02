import React, { useState, useEffect } from "react";

import { PageLoader } from "neetoui";
import { Container } from "neetoui/layouts";

import { articlesApi, categoriesApi } from "apis/admin";

import { ColumnsListItems } from "./constants";
import EmptyState from "./EmptyState";
import Header from "./Header";
import MenuBar from "./Menu";
import Table from "./Table";
import { searchArticlesByTitle } from "./utils";

const Articles = () => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [columnsList, setColumnsList] = useState(ColumnsListItems);
  const [searchArticleTerm, setSearchArticleTerm] = useState("");
  const [allArticles, setAllArticles] = useState({
    articlesList: [],
    selectedArticles: [],
    articlesTable: [],
  });

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
        data: { articles },
      } = await articlesApi.fetch();
      setAllArticles({
        articlesList: articles,
        selectedArticles: articles,
        articlesTable: articles,
      });
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
        allArticles={allArticles}
        categories={categories}
        refetch={fetchArticlesAndCategories}
        setAllArticles={setAllArticles}
      />
      <Container>
        <Header
          columnsList={columnsList}
          disabled={categories.length === 0}
          handleCheckedColumns={handleCheckedColumns}
          searchArticleTerm={searchArticleTerm}
          setSearchArticleTerm={setSearchArticleTerm}
        />
        {allArticles.articlesTable.length ? (
          <div className="flex w-full flex-col">
            <Table
              refetch={fetchArticlesAndCategories}
              articles={searchArticlesByTitle(
                allArticles.articlesTable,
                searchArticleTerm
              )}
            />
          </div>
        ) : (
          <EmptyState disabled={categories.length === 0} />
        )}
      </Container>
    </div>
  );
};

export default Articles;
