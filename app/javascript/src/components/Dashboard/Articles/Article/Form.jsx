import React, { useEffect, useState } from "react";

import { Formik, Form as FormikForm } from "formik";
import { Info } from "neetoicons";
import { Dropdown, Button, PageLoader, Callout } from "neetoui";
import { Select, Input, Textarea } from "neetoui/formik";
import { useHistory } from "react-router-dom";

import { categoriesApi, articlesApi } from "apis/admin";
import Tooltip from "components/Common/Tooltip";
import { formatTimeStampToTimeAndDate } from "components/utils";

import { ARTICLES_FORM_VALIDATION_SCHEMA } from "../constants";

const Form = ({
  isEdit,
  refetch,
  selectedArticle,
  handleSubmit,
  articleStatusList,
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(
    selectedArticle.status === "Published" ? "Publish" : "Save draft"
  );
  const [categories, setCategories] = useState([]);

  const history = useHistory();
  const { Menu, MenuItem } = Dropdown;

  useEffect(() => {
    fetchCategories();
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

  const handleCancelScheduled = async status => {
    try {
      if (status === "Publish later") {
        await articlesApi.update(selectedArticle.id, {
          scheduled_publish: null,
        });
      } else {
        await articlesApi.update(selectedArticle.id, {
          scheduled_unpublish: null,
        });
      }
      refetch();
    } catch (error) {
      logger.error(error);
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
      {({ isSubmitting, setFieldValue, dirty }) => (
        <FormikForm className="mx-auto mt-8 w-6/12">
          {selectedArticle.scheduledPublish !== null && (
            <Callout className="my-2" icon={Info} style="info">
              <div>
                This article is scheduled to be published at&nbsp;
                {formatTimeStampToTimeAndDate(selectedArticle.scheduledPublish)}
                .&nbsp;
                <span
                  className="cursor-pointer underline"
                  onClick={() => handleCancelScheduled("Publish later")}
                >
                  Click here to cancel publish scheduled.
                </span>
              </div>
            </Callout>
          )}
          {selectedArticle.scheduledUnpublish !== null && (
            <Callout className="my-2" icon={Info} style="info">
              <div>
                This article is scheduled to be Unpublished at&nbsp;
                {formatTimeStampToTimeAndDate(
                  selectedArticle.scheduledUnpublish
                )}
                .&nbsp;
                <span
                  className="cursor-pointer underline"
                  onClick={() => handleCancelScheduled("Unpublish later")}
                >
                  Click here to cancel unpublish scheduled.
                </span>
              </div>
            </Callout>
          )}
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
              <Tooltip
                content="Please make any change to save."
                disabled={isSubmitting || (isEdit && !dirty)}
                followCursor="horizontal"
                position="bottom"
              >
                <Button
                  className="mr-px"
                  disabled={isSubmitting || (isEdit && !dirty)}
                  label={status}
                  loading={isSubmitting}
                  name="status"
                  size="medium"
                  style="primary"
                  type="submit"
                  onClick={() => {
                    setFieldValue("status", status);
                    setSubmitted(true);
                  }}
                />
              </Tooltip>
              <Dropdown>
                <Menu>
                  {articleStatusList.map((status, idx) => (
                    <MenuItem.Button
                      key={idx}
                      onClick={() => {
                        setFieldValue("status", status);
                        setStatus(status);
                      }}
                    >
                      {status}
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
