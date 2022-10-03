import React, { useState } from "react";

import { Formik, Form } from "formik";
import { Dropdown, Button } from "neetoui";
import { Select, Input, Textarea } from "neetoui/formik";

import {
  SELECTED_CATEGORY,
  ARTICLES_FORM_INITIAL_VALUES,
  ARTICLES_FORM_VALIDATION_SCHEMA,
} from "./constants";

const ArticleForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState("Save Draft");
  const { Menu, MenuItem } = Dropdown;
  const statusListItems = ["Save Draft", "Publish"];

  return (
    <Formik
      initialValues={ARTICLES_FORM_INITIAL_VALUES}
      validateOnBlur={submitted}
      validateOnChange={submitted}
      validationSchema={ARTICLES_FORM_VALIDATION_SCHEMA}
      onSubmit={() => {}}
    >
      {({ isSubmitting }) => (
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
              options={SELECTED_CATEGORY}
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
                    <MenuItem.Button key={idx} onClick={() => setStatus(item)}>
                      {item}
                    </MenuItem.Button>
                  ))}
                </Menu>
              </Dropdown>
            </div>
            <Button label="Cancel" style="text" type="reset" />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ArticleForm;
