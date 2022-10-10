import React, { useState } from "react";

import { Formik, Form } from "formik";
import { Dropdown, Button } from "neetoui";
import { Select, Input, Textarea } from "neetoui/formik";

import articlesApi from "apis/articles";

import {
  ARTICLES_FORM_INITIAL_VALUES,
  ARTICLES_FORM_VALIDATION_SCHEMA,
} from "./constants";
import { convertArticleToFormFormat } from "./utils";

const ArticleForm = ({
  isEdit,
  selectedEditArticle,
  categories,
  refetch,
  setFormEdit,
  setShowArticlesPage,
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState("Save Draft");
  const { Menu, MenuItem } = Dropdown;
  const statusListItems = ["Save Draft", "Publish"];

  const CATEGORY_OPTIONS = categories.map(category => ({
    label: category.name,
    value: category.id,
  }));

  const initialFormValues = isEdit
    ? convertArticleToFormFormat(selectedEditArticle)
    : ARTICLES_FORM_INITIAL_VALUES;

  const handleSubmit = async values => {
    try {
      const newCategoryData = { ...values };
      newCategoryData.category_id = values.category_id.value;
      if (isEdit) {
        await articlesApi.update(selectedEditArticle.slug, newCategoryData);
      } else {
        await articlesApi.create(newCategoryData);
      }
      setShowArticlesPage(true);
      refetch();
    } catch (error) {
      logger.error(error);
    }
  };

  const handleCancel = () => {
    setFormEdit(false);
    refetch();
    setShowArticlesPage(true);
  };

  return (
    <Formik
      initialValues={initialFormValues}
      validateOnBlur={submitted}
      validateOnChange={submitted}
      validationSchema={ARTICLES_FORM_VALIDATION_SCHEMA(CATEGORY_OPTIONS)}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, setFieldValue }) => (
        <Form className="mx-auto mt-8 w-6/12">
          <div className="my-5 flex gap-x-4">
            <Input
              required
              className="mr-3 w-5/12"
              label="Article Title"
              name="title"
              placeholder="Enter Title"
            />
            <Select
              isSearchable
              required
              className="w-56"
              label="Select Category"
              name="category_id"
              options={CATEGORY_OPTIONS}
              placeholder="Select Category"
            />
          </div>
          <Textarea
            required
            label="Article Body"
            name="description"
            placeholder="Enter text"
            rows={30}
          />
          <div className="mt-4 flex gap-2">
            <div className="flex">
              <Button
                className="mr-px"
                disabled={isSubmitting}
                label={status}
                loading={isSubmitting}
                name="status"
                size="medium"
                style="primary"
                type="submit"
                onClick={() => setSubmitted(true)}
              />
              <Dropdown>
                <Menu>
                  {statusListItems.map((item, idx) => (
                    <MenuItem.Button
                      key={idx}
                      onClick={() => {
                        setFieldValue(
                          "status",
                          item !== "Save Draft" ? "Published" : "Draft"
                        );
                        setStatus(item);
                      }}
                    >
                      {item}
                    </MenuItem.Button>
                  ))}
                </Menu>
              </Dropdown>
            </div>
            <Button
              label="Cancel"
              style="text"
              type="reset"
              onClick={handleCancel}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ArticleForm;
