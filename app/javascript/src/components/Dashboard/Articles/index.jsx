import React, { useState, useEffect } from "react";

import { PageLoader } from "neetoui";
import { Container } from "neetoui/layouts";

import { articlesApi, categoriesApi } from "apis/admin";

import { ColumnsListItems } from "./constants";
import EmptyState from "./EmptyState";
import Header from "./Header";
import MenuBar from "./Menu";
import Table from "./Table";

const Articles = () => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [columnsList, setColumnsList] = useState(ColumnsListItems);
  const [articles, setArticles] = useState([]);
  const [filterOptions, setFilterOptions] = useState({
    searchTerm: "",
    categoryIds: [],
    activeStatus: "All",
  });

  const handleCheckedColumns = selectedIdx => {
    const items = ColumnsListItems;
    const selectedItem = items[selectedIdx];
    selectedItem.checked = !selectedItem.checked;
    setColumnsList([...items]);
  };

  const fetchArticles = async () => {
    const payload = {
      status: filterOptions.activeStatus,
      category_ids: filterOptions.categoryIds,
      search_term: filterOptions.searchTerm,
    };
    try {
      const {
        data: { articles },
      } = await articlesApi.fetch(payload);
      setArticles(articles);
    } catch (error) {
      logger.error(error);
    }
  };

  const fetchCategories = async () => {
    try {
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
  }, [filterOptions]);

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
        categories={categories}
        filterOptions={filterOptions}
        refetch={fetchArticlesAndCategories}
        setFilterOptions={setFilterOptions}
      />
      <Container>
        <Header
          columnsList={columnsList}
          disabled={categories.length === 0}
          filterOptions={filterOptions}
          handleCheckedColumns={handleCheckedColumns}
          setFilterOptions={setFilterOptions}
        />
        {articles.length ? (
          <div className="flex w-full flex-col">
            <Table articles={articles} refetch={fetchArticlesAndCategories} />
          </div>
        ) : (
          <EmptyState disabled={categories.length === 0} />
        )}
      </Container>
    </div>
  );
};

export default Articles;
