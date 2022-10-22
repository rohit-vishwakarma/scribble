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
  const [categoriesAndArticles, setCategoriesAndArticles] = useState([]);
  const [publishedArticles, setPublishedArticles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [defaultPreviewPath, setDefaultPreviewPath] = useState("");

  const { path, url } = useRouteMatch();

  useEffect(() => {
    fetchCategoriesAndArticles();
  }, []);

  const fetchCategoriesAndArticles = async () => {
    try {
      setLoading(true);
      const fetchedCategories = await categoriesApi.fetch();
      const {
        data: { publishedArticles },
      } = await articlesApi.fetch();
      setCategoriesAndArticles(fetchedCategories.data);
      setPublishedArticles(publishedArticles);
      findDefaultPreviewPath(
        fetchedCategories.data,
        setDefaultPreviewPath,
        setSelectedCategory
      );
      setIndexOfSelectedCategory(fetchedCategories.data, setSelectedCategory);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

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
        {categoriesAndArticles.map((category, idx) => (
          <Accordion.Item key={idx} title={category.name}>
            {category.publishedArticles.length > 0 ? (
              category.publishedArticles.map(article => (
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
