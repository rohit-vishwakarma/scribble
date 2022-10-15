import React, { useState, useEffect } from "react";

import { PageLoader, Accordion, Typography } from "neetoui";
import { useRouteMatch, NavLink } from "react-router-dom";

import categoriesApi from "apis/categories";

const Sidebar = () => {
  const [loading, setLoading] = useState(true);
  const [categoriesAndArticles, setCategoriesAndArticles] = useState([]);

  const { url } = useRouteMatch();

  useEffect(() => {
    fetchCategoriesAndArticles();
  }, []);

  const fetchCategoriesAndArticles = async () => {
    try {
      setLoading(true);
      const fetchedCategories = await categoriesApi.fetch();
      setCategoriesAndArticles(fetchedCategories.data);
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
    <Accordion className="border-r h-screen w-1/4 px-5" defaultActiveKey={0}>
      {categoriesAndArticles.map((category, idx) => (
        <Accordion.Item key={idx} title={category.name}>
          {category.publishedArticles.map(article => (
            <NavLink
              exact
              activeClassName="neeto-ui-text-primary-500 mx-6"
              className="neeto-ui-text-gray-400 mx-6"
              key={article.slug}
              to={`${url}/${article.slug}`}
            >
              <Typography style="h5">{article.title}</Typography>
            </NavLink>
          ))}
        </Accordion.Item>
      ))}
    </Accordion>
  );
};

export default Sidebar;
