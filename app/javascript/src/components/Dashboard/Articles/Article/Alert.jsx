import React from "react";

import { Alert as NeetoUIAlert } from "neetoui";
import { useHistory } from "react-router-dom";

import { articlesApi } from "apis/admin";

const Alert = ({ article, formValues, onClose }) => {
  const history = useHistory();

  const scheduledStatus =
    formValues.status === "Published" && article.scheduled_publish !== null
      ? "Publish"
      : "Unpublished";

  const handleSubmit = async () => {
    try {
      if (
        formValues.status === "Draft" &&
        article.scheduled_unpublish !== null
      ) {
        formValues.scheduled_unpublish = null;
      } else if (
        formValues.status === "Published" &&
        article.scheduled_publish !== null
      ) {
        formValues.scheduled_publish = null;
      }
      await articlesApi.update(article.id, formValues);
      history.push("/");
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <NeetoUIAlert
      isOpen
      message={`Are you sure you want to continue? This will remove the scheduled ${scheduledStatus}.`}
      title="Removing scheduled article"
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  );
};

export default Alert;
