import React, { useState, useEffect } from "react";

import { PageLoader, Typography } from "neetoui";
import { Container } from "neetoui/layouts";

import articlesApi from "apis/articles";
import categoriesApi from "apis/categories";

import { ColumnsListItems } from "./constants";
import EmptyState from "./EmptyState";
import Form from "./Form";
import Header from "./Header";
import MenuBar from "./Menu";
import Table from "./Table";

const Articles = () => {
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [columnsList, setColumnsList] = useState(ColumnsListItems);
  const [showArticlesPage, setShowArticlesPage] = useState(true);
  const [selectedEditArticle, setSelectedEditArticle] = useState({});
  const [formEdit, setFormEdit] = useState(false);
  const [articlesCount, setArticlesCount] = useState({});

  const handleChecked = selectedIdx => {
    const items = ColumnsListItems;
    const selectedItem = items[selectedIdx];
    selectedItem.checked = !selectedItem.checked;
    setColumnsList([...items]);
  };

  useEffect(() => {
    fetchArticlesAndCategories();
  }, []);

  const fetchArticlesAndCategories = async () => {
    try {
      setLoading(true);
      await categoriesApi.fetch();
      const {
        data: { articles, draft, published },
      } = await articlesApi.fetch();
      const fetchedCategories = await categoriesApi.fetch();
      setArticles(articles);
      setArticlesCount({ all: draft + published, draft, published });
      setCategories(fetchedCategories.data);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };
  const handleEdit = selectedArticle => {
    setSelectedEditArticle(selectedArticle);
    setFormEdit(prevState => !prevState);
    setShowArticlesPage(prevState => !prevState);
  };

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div className="flex">
      {showArticlesPage ? (
        <>
          <MenuBar
            articles={articles}
            articlesCount={articlesCount}
            categories={categories}
            refetch={fetchArticlesAndCategories}
            setArticles={setArticles}
          />
          <Container>
            <Header
              articles={articles}
              columnsList={columnsList}
              handleChecked={handleChecked}
              setArticles={setArticles}
              setShowArticlesPage={setShowArticlesPage}
            />
            <Typography className="pb-6" style="h4">
              {articles.length}&nbsp;Articles
            </Typography>
            {articles.length ? (
              <div className="flex w-full flex-col">
                <Table
                  articles={articles}
                  handleEdit={handleEdit}
                  refetch={fetchArticlesAndCategories}
                  setShowArticlesPage={setShowArticlesPage}
                />
              </div>
            ) : (
              <EmptyState
                primaryAction={() => setShowArticlesPage(false)}
                primaryActionLabel="Add New Article"
                subtitle="Add some articles"
                title="Looks like you don't have any articles!"
              />
            )}
          </Container>
        </>
      ) : (
        <Form
          categories={categories}
          isEdit={formEdit}
          refetch={fetchArticlesAndCategories}
          selectedEditArticle={selectedEditArticle}
          setShowArticlesPage={setShowArticlesPage}
        />
      )}
    </div>
  );
};

export default Articles;
