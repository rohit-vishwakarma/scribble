import React, { useState, useEffect } from "react";

import { PageLoader, Typography } from "neetoui";
import { Container } from "neetoui/layouts";

import articlesApi from "apis/articles";
import categoriesApi from "apis/categories";

import { ColumnsListItems } from "./constants";
import EmptyState from "./EmptyState";
import Header from "./Header";
import MenuBar from "./Menu";
import Table from "./Table";

const Articles = () => {
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [columnsList, setColumnsList] = useState(ColumnsListItems);

  const handleChecked = selectedIdx => {
    const items = ColumnsListItems;
    const selectedItem = items[selectedIdx];
    selectedItem.checked = !selectedItem.checked;
    setColumnsList([...items]);
  };

  useEffect(() => {
    fetchArticles();
    fetchCategories();
  }, []);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const { data } = await articlesApi.fetch();
      setArticles(data.articles);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const { data } = await categoriesApi.fetch();
      setCategories(data.categories);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div className="flex">
      <MenuBar categories={categories} />
      <Container>
        <Header
          articles={articles}
          columnsList={columnsList}
          handleChecked={handleChecked}
          setArticles={setArticles}
        />
        <Typography className="pb-6" style="h4">
          {articles.length}&nbsp;Articles
        </Typography>
        {articles.length ? (
          <div className="flex w-full flex-col">
            <Table articles={articles} />
          </div>
        ) : (
          <EmptyState
            primaryAction={() => {}}
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
