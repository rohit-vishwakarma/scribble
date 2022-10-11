import React from "react";

import { useHistory } from "react-router-dom";

import articlesApi from "apis/articles";

import Form from "./Form";

import { ARTICLES_FORM_INITIAL_VALUES } from "../constants";
import { convertArticleToFormFormat } from "../utils";

const Create = () => {
  const history = useHistory();

  const handleSubmit = async values => {
    try {
      const newCategoryData = { ...values };
      newCategoryData.category_id = values.category_id.value;
      await articlesApi.create(newCategoryData);
      history.push("/");
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <Form
      handleSubmit={handleSubmit}
      selectedArticle={convertArticleToFormFormat(ARTICLES_FORM_INITIAL_VALUES)}
    />
  );
};

export default Create;