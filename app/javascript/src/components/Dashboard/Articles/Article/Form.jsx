import React, { useEffect, useState } from "react";

import { Formik, Form } from "formik";
import { Dropdown, Button, PageLoader } from "neetoui";
import { Select, Input, Textarea } from "neetoui/formik";
import { useHistory } from "react-router-dom";

import categoriesApi from "apis/categories";

import { ARTICLES_FORM_VALIDATION_SCHEMA } from "../constants";

const ArticleForm = ({ selectedArticle, handleSubmit }) => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("Save Draft");
  const [categories, setCategories] = useState([]);
  const history = useHistory();
  const { Menu, MenuItem } = Dropdown;
  const statusListItems = ["Save Draft", "Publish"];

  useEffect(() => {
    fetchCategories();
    if (selectedArticle.status === "Published") {
      setStatus("Published");
    }
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const fetchedCategories = await categoriesApi.fetch();
      setCategories(fetchedCategories.data);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <PageLoader />;
  }

  const CATEGORY_OPTIONS = categories.map(category => ({
    label: category.name,
    value: category.id,
  }));

  return (
    <Formik
      initialValues={selectedArticle}
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
              onClick={() => history.push("/")}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ArticleForm;