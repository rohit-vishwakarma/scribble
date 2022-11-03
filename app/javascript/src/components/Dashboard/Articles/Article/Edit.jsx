import React, { useEffect, useState } from "react";

import { PageLoader } from "neetoui";
import { useHistory, useParams } from "react-router-dom";

import { articlesApi } from "apis/admin";

import Form from "./Form";
import VersionHistory from "./VersionHistory";

import { convertArticleToFormFormat } from "../utils";

const Edit = () => {
  const [article, setArticle] = useState({});
  const [loading, setLoading] = useState(true);
  const [articleVersions, setArticleVersions] = useState([]);

  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    fetchArticleAndVersions();
  }, []);

  const fetchArticleAndVersions = async () => {
    await Promise.all([fetchArticle(), fetchArticleVersions()]);
    setLoading(false);
  };

  const fetchArticleVersions = async () => {
    try {
      setLoading(true);
      const {
        data: { article_versions: articleVersions },
      } = await articlesApi.versions(id);
      const versions = articleVersions
        .map(version => ({
          id: version.id,
          article: version.object,
          category: version.category,
        }))
        .splice(1);
      setArticleVersions(versions);
    } catch (error) {
      logger.error(error);
    }
  };

  const fetchArticle = async () => {
    try {
      setLoading(true);
      const fetchedArticle = await articlesApi.show(id);
      setArticle(fetchedArticle.data);
    } catch (error) {
      logger.error(error);
    }
  };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      resetForm();
      const articleData = { ...values, version_status: article.status };
      articleData.category_id = values.category.value;
      await articlesApi.update(article.id, articleData);
      history.push("/");
    } catch (error) {
      logger.error(error);
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
      <Form
        isEdit
        handleSubmit={handleSubmit}
        selectedArticle={convertArticleToFormFormat(article)}
      />
      <VersionHistory article={article} articleVersions={articleVersions} />
    </div>
  );
};

export default Edit;
