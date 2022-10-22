import React from "react";

import { useHistory } from "react-router-dom";

import articlesApi from "apis/articles";

import Form from "./Form";

import { ARTICLES_FORM_INITIAL_VALUES } from "../constants";

const Create = () => {
  const history = useHistory();

  const handleSubmit = async (values, { resetForm }) => {
    try {
      resetForm();
      const newCategoryData = { ...values };
      newCategoryData.category_id = values.category.value;
      await articlesApi.create(newCategoryData);
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
