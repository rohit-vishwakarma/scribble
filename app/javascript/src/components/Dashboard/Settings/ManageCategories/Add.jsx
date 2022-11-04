import React, { useState } from "react";

import { Formik, Form } from "formik";
import { Plus, Check, Close } from "neetoicons";
import { Button } from "neetoui";
import { Input as FormikInput } from "neetoui/formik";
import * as yup from "yup";

import { categoriesApi } from "apis/admin";
import Tooltip from "components/Common/Tooltip";

const Add = ({ refetch }) => {
  const [showAdd, setShowAdd] = useState(false);

  const handleSubmit = async values => {
    try {
      const { name } = values;
      await categoriesApi.create({ name });
      setShowAdd(prevState => !prevState);
      refetch();
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <>
      {showAdd ? (
        <Formik
          initialValues={{ name: "" }}
          validationSchema={yup.object().shape({
            name: yup
              .string()
              .matches(/\w*[aA-zZ]\w*/, "Must contain at least one letter.")
              .required("Name is required. Please enter the name."),
          })}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, dirty }) => (
            <Form>
              <FormikInput
                className="mb-2 w-2/4"
                name="name"
                suffix={
                  <>
                    <Button
                      icon={Close}
                      size={13}
                      style="text"
                      onClick={() => setShowAdd(prevState => !prevState)}
                    />
                    <Tooltip
                      content="Enter category name to add."
                      disabled={isSubmitting || !dirty}
                      followCursor="horizontal"
                      position="bottom"
                    >
                      <Button
                        disabled={isSubmitting || !dirty}
                        icon={Check}
                        size={13}
                        style="text"
                        type="submit"
                      />
                    </Tooltip>
                  </>
                }
              />
            </Form>
          )}
        </Formik>
      ) : (
        <Button
          className="mb-5"
          icon={Plus}
          iconPosition="left"
          label="Add new category"
          style="link"
          onClick={() => setShowAdd(prevState => !prevState)}
        />
      )}
    </>
  );
};

export default Add;
