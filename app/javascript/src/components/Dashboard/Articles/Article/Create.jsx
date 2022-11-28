import React, { useState } from "react";

import { useHistory } from "react-router-dom";

import { articlesApi } from "apis/admin";

import {
  ARTICLES_FORM_INITIAL_VALUES,
  StatusListForDraftedOrUnpublishScheduledArticle,
} from "./constants";
import DatePicker from "./DatePicker";
import Form from "./Form";

const Create = () => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [formValues, setFormValues] = useState({});

  const history = useHistory();

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const articleData = { ...values };
      articleData.category_id = values.category.value;
      const status = values.status;
      if (status === "Publish later") {
        setFormValues(articleData);
        setShowDatePicker(true);
      } else {
        resetForm();
        articleData.status = status === "Publish" ? "Published" : "Draft";
        await articlesApi.create(articleData);
        history.push("/");
      }
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <>
      <Form
        articleStatusList={StatusListForDraftedOrUnpublishScheduledArticle}
        handleSubmit={handleSubmit}
        selectedArticle={ARTICLES_FORM_INITIAL_VALUES}
      />
      {showDatePicker && (
        <DatePicker
          formValues={formValues}
          setShowDatePicker={setShowDatePicker}
          showDatePicker={showDatePicker}
        />
      )}
    </>
  );
};

export default Create;
