import React, { useEffect, useState } from "react";

import { PageLoader } from "neetoui";
import { useHistory, useParams } from "react-router-dom";

import { articlesApi } from "apis/admin";

import Alert from "./Alert";
import {
  StatusListForDraftedOrUnpublishScheduledArticle,
  StatusListForPublishedOrPublishScheduledArticle,
  StatusListForUnpublishAndPublishScheduledArticle,
} from "./constants";
import DatePicker from "./DatePicker";
import Form from "./Form";
import VersionHistory from "./VersionHistory";

import { convertArticleToFormFormat } from "../utils";

const Edit = () => {
  const [article, setArticle] = useState({});
  const [loading, setLoading] = useState(true);
  const [articleVersions, setArticleVersions] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [articleStatusList, setArticleStatusList] = useState(
    StatusListForDraftedOrUnpublishScheduledArticle
  );

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
        .splice(1)
        .reverse();
      setArticleVersions(versions);
    } catch (error) {
      logger.error(error);
    }
  };

  const fetchArticle = async () => {
    try {
      const { data } = await articlesApi.show(id);
      setArticle(data);
      if (
        data.scheduled_unpublish !== null &&
        data.scheduled_publish !== null
      ) {
        setArticleStatusList(StatusListForUnpublishAndPublishScheduledArticle);
      } else if (data.scheduled_unpublish !== null) {
        setArticleStatusList(StatusListForDraftedOrUnpublishScheduledArticle);
      } else if (
        data.scheduled_publish !== null ||
        data.status === "Published"
      ) {
        setArticleStatusList(StatusListForPublishedOrPublishScheduledArticle);
      }
    } catch (error) {
      logger.error(error);
    }
  };

  const handleSubmit = async values => {
    try {
      const articleData = {
        ...values,
        version_status: false,
        restored_at: null,
      };
      articleData.category_id = values.category.value;
      const status = values.status;

      if (status !== "Save draft" && status !== "Publish") {
        setFormValues(articleData);
        setShowDatePicker(true);
      } else if (
        (article.scheduled_publish !== null && status === "Publish") ||
        (article.scheduled_unpublish !== null && status === "Save draft")
      ) {
        articleData.status = status === "Publish" ? "Published" : "Draft";
        setFormValues(articleData);
        setShowAlert(true);
      } else {
        articleData.status = status === "Publish" ? "Published" : "Draft";
        await articlesApi.update(article.id, articleData);
        history.push("/");
      }
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
        articleStatusList={articleStatusList}
        handleSubmit={handleSubmit}
        refetch={fetchArticle}
        selectedArticle={convertArticleToFormFormat(article)}
      />
      <VersionHistory article={article} articleVersions={articleVersions} />
      {showDatePicker && (
        <DatePicker
          isEdit
          formValues={formValues}
          selectedArticle={article}
          setShowDatePicker={setShowDatePicker}
          showDatePicker={showDatePicker}
        />
      )}
      {showAlert && (
        <Alert
          article={article}
          formValues={formValues}
          onClose={() => setShowAlert(false)}
        />
      )}
    </div>
  );
};

export default Edit;
