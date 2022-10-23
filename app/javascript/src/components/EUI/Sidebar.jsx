import React, { useState, useEffect } from "react";

import { PageLoader, Accordion, Typography } from "neetoui";
import {
  useRouteMatch,
  Redirect,
  Switch,
  NavLink,
  Route,
} from "react-router-dom";

import { articlesApi, categoriesApi } from "apis/index";
import NotFound from "components/Common/NotFound";

import Article from "./Article";
import { setIndexOfSelectedCategory, findDefaultPreviewPath } from "./utils";

const Sidebar = () => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [publishedArticles, setPublishedArticles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [defaultPreviewPath, setDefaultPreviewPath] = useState("");

  const { path, url } = useRouteMatch();

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const { data } = await categoriesApi.fetch();
      setCategories(data);
      findDefaultPreviewPath(data, setDefaultPreviewPath, setSelectedCategory);
      setIndexOfSelectedCategory(data, setSelectedCategory);
    } catch (error) {
      logger.error(error);
    }
  };

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const {
        data: { published_articles: publishedArticles },
      } = await articlesApi.fetch();
      setPublishedArticles(publishedArticles);
    } catch (error) {
      logger.error(error);
    }
  };

  const fetchCategoriesAndArticles = async () => {
    await Promise.all([fetchCategories(), fetchArticles()]);
    setLoading(false);
  };

  useEffect(() => {
    fetchCategoriesAndArticles();
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
      <Accordion
        className="border-r h-screen w-1/4 px-5"
        defaultActiveKey={selectedCategory}
      >
        {categories.map((category, idx) => (
          <Accordion.Item key={idx} title={category.name}>
            {category.articles.length > 0 ? (
              category.articles.map(article => (
                <NavLink
                  exact
                  activeClassName="neeto-ui-text-primary-500 mx-6"
                  className="neeto-ui-text-gray-400 mx-6"
                  key={article.slug}
                  to={`${url}/${article.slug}`}
                  onClick={() => setSelectedCategory(idx)}
                >
                  <Typography style="h5">{article.title}</Typography>
                </NavLink>
              ))
            ) : (
              <Typography style="h5">No articles exists.</Typography>
            )}
          </Accordion.Item>
        ))}
      </Accordion>
      <Switch>
        {publishedArticles.map(article => (
          <Route key={article.slug} path={`${path}/${article.slug}`}>
            <Article article={article} />
          </Route>
        ))}
        <Redirect exact from="/public" to={`/public/${defaultPreviewPath}`} />
      </Switch>
      {selectedCategory === -1 && <NotFound message="No Article Found" />}
    </div>
  );
};

export default Sidebar;
