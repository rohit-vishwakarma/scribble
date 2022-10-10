import React, { useEffect, useState } from "react";

import { PageLoader } from "neetoui";
import { useHistory, useParams } from "react-router-dom";

import articlesApi from "apis/articles";

import Form from "./Form";

const Edit = () => {
  const [article, setArticle] = useState({});
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();
  const history = useHistory();

  useEffect(() => {
    fetchArticle();
  }, []);

  const fetchArticle = async () => {
    try {
      setLoading(true);
      const fetchedArticle = await articlesApi.show(slug);
      setArticle(fetchedArticle.data);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async values => {
    try {
      const newCategoryData = { ...values };
      newCategoryData.category_id = values.category_id.value;
      await articlesApi.update(article.slug, newCategoryData);
      history.push("/");
    } catch (error) {
      logger.error(error);
    }
  };

  if (loading) {
    return <PageLoader />;
  }

  return <Form isEdit handleSubmit={handleSubmit} selectedArticle={article} />;
};

export default Edit;
