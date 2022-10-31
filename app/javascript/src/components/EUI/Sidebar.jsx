import React, { useState, useEffect } from "react";

import { PageLoader, Accordion, Typography } from "neetoui";
import { useRouteMatch, NavLink, Redirect } from "react-router-dom";

import { categoriesApi } from "apis/index";
import NotFound from "components/Common/NotFound";

import Article from "./Article";
import { setIndexOfSelectedCategory, findPreviewPath } from "./utils";

const Sidebar = () => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(-1);
  const [previewPath, setPreviewPath] = useState("");

  const { url } = useRouteMatch();

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const { data } = await categoriesApi.fetch();
      setCategories(data);
      findPreviewPath(data, setPreviewPath, setSelectedCategory);
      setIndexOfSelectedCategory(data, setSelectedCategory, setPreviewPath);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
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
                  onClick={() => {
                    setSelectedCategory(idx);
                    setPreviewPath(article.slug);
                  }}
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
      {selectedCategory !== -1 ? (
        <>
          <Article slug={previewPath} />
          <Redirect exact from="/public" to={`/public/${previewPath}`} />
        </>
      ) : (
        <NotFound message="No Article Found" />
      )}
    </div>
  );
};

export default Sidebar;
