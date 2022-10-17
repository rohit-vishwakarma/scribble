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

import Article from "./Article";

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

  const setIndexOfSelectedCategory = categories => {
    const currentPathSplitBySlash = window.location.pathname.split("/");
    const lastIndex = currentPathSplitBySlash.length - 1;
    const currentSlug = currentPathSplitBySlash[lastIndex];

    categories.forEach((category, idx) =>
      category.publishedArticles.filter(article => {
        const isSlugMatched = article.slug === currentSlug;
        if (isSlugMatched) setSelectedCategory(idx);

        return isSlugMatched;
      })
    );
  };

  const findDefaultPreviewPath = categories => {
    const defaultCategory = categories.find(
      category => category.publishedArticles.length !== 0
    );

    setDefaultPreviewPath(defaultCategory.publishedArticles[0].slug);
    setSelectedCategory(categories.indexOf(defaultCategory));
  };

  const fetchCategoriesAndArticles = async () => {
    try {
      setLoading(true);
      const fetchedCategories = await categoriesApi.fetch();
      const {
        data: { publishedArticles },
      } = await articlesApi.fetch();
      setCategoriesAndArticles(fetchedCategories.data);
      setPublishedArticles(publishedArticles);
      findDefaultPreviewPath(fetchedCategories.data);
      setIndexOfSelectedCategory(fetchedCategories.data);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    <div className="h-screen w-screen">
      <PageLoader />
    </div>;
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
    </div>
  );
};

export default Sidebar;
