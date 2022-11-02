import React, { useEffect, useState } from "react";

import { Formik, Form as FormikForm } from "formik";
import { Dropdown, Button, PageLoader } from "neetoui";
import { Select, Input, Textarea, BlockNavigation } from "neetoui/formik";
import { useHistory } from "react-router-dom";

import categoriesApi from "apis/categories";

import { ARTICLES_FORM_VALIDATION_SCHEMA } from "../constants";

const Form = ({ selectedArticle, handleSubmit }) => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("Save draft");
  const [categories, setCategories] = useState([]);
  const history = useHistory();
  const { Menu, MenuItem } = Dropdown;
  const statusListItems = ["Save draft", "Publish"];

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

  const CATEGORY_OPTIONS = categories.map(category => ({
    label: category.name,
    value: category.id,
  }));

  if (loading) {
    return (
      <div className="h-screen w-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <Formik
      initialValues={selectedArticle}
      validateOnBlur={submitted}
      validateOnChange={submitted}
      validationSchema={ARTICLES_FORM_VALIDATION_SCHEMA(CATEGORY_OPTIONS)}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, setFieldValue, dirty, isValid }) => (
        <FormikForm className="mx-auto mt-8 w-6/12">
          <BlockNavigation />
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
              name="category"
              options={CATEGORY_OPTIONS}
              placeholder="Select Category"
            />
          </div>
          <Textarea
            required
            label="Article Body"
            name="body"
            placeholder="Enter text"
            rows={30}
          />
          <div className="mt-4 flex gap-2">
            <div className="flex">
              <Button
                className="mr-px"
                disabled={isSubmitting || !(dirty && isValid)}
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
                          item !== "Save draft" ? "Published" : "Draft"
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
        </FormikForm>
      )}
    </Formik>
  );
};

export default Form;
