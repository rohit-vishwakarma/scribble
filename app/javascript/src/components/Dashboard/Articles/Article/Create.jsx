import React from "react";

import { useHistory } from "react-router-dom";

import { articlesApi } from "apis/admin";

import Form from "./Form";

import { ARTICLES_FORM_INITIAL_VALUES } from "../constants";

const Create = () => {
  const history = useHistory();

  const handleSubmit = async (values, { resetForm }) => {
    try {
      resetForm();
      const articleData = { ...values };
      articleData.category_id = values.category.value;
      await articlesApi.create(articleData);
      history.push("/");
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <Form
      handleSubmit={handleSubmit}
      selectedArticle={ARTICLES_FORM_INITIAL_VALUES}
    />
  );
};

export default Create;
