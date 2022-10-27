import React from "react";

import { Formik, Form as FormikForm } from "formik";
import { Check, Close } from "neetoicons";
import { Button } from "neetoui";
import { Input } from "neetoui/formik";

import redirectionsApi from "apis/redirections";

import { REDIRECTION_FORM_VALIDATION_SCHEMA } from "./constants";

const Form = ({ setShowRedirection, initialValues, isEdit, refetch }) => {
  const handleSubmit = async values => {
    try {
      if (isEdit) {
        await redirectionsApi.update(initialValues.id, {
          from: values.from,
          to: values.to,
        });
        setShowRedirection(null);
      } else {
        setShowRedirection(false);
        await redirectionsApi.create(values);
      }
      refetch();
    } catch (error) {
      logger.info(error);
    }
  };

  return (
    <Formik
      validateOnChange
      initialValues={initialValues}
      validationSchema={REDIRECTION_FORM_VALIDATION_SCHEMA}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, dirty, isValid }) => (
        <FormikForm className="my-2 flex w-full">
          <Input
            required
            className="mx-2 w-2/5"
            name="from"
            placeholder="Should start with /"
            type="text"
          />
          <Input
            required
            className="w-2/5"
            name="to"
            placeholder="Should start with /"
            type="text"
          />
          <Button
            icon={Close}
            size={13}
            style="text"
            onClick={() => {
              isEdit ? setShowRedirection(null) : setShowRedirection(false);
            }}
          />
          <Button
            disabled={isSubmitting || (isEdit && !(isValid && dirty))}
            icon={Check}
            size={13}
            style="text"
            type="submit"
          />
        </FormikForm>
      )}
    </Formik>
  );
};

export default Form;
