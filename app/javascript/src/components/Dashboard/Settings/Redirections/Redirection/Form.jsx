import React from "react";

import { Formik, Form as FormikForm } from "formik";
import { Check, Close } from "neetoicons";
import { Button, Toastr } from "neetoui";
import { Input } from "neetoui/formik";

import redirectionsApi from "apis/redirections";

const Form = ({ setShowRedirection, initialValues, isEdit, refetch }) => {
  const handleSubmit = async values => {
    try {
      if (values.from === values.to) {
        Toastr.warning("From path and To path must not be same.");

        return;
      }

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
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      <div className="my-2 w-full">
        <FormikForm className="flex">
          <Input required className="mx-2 w-2/5" name="from" type="text" />
          <Input required className="w-2/5" name="to" type="text" />
          <Button
            icon={Close}
            size={13}
            style="text"
            onClick={() => {
              isEdit ? setShowRedirection(null) : setShowRedirection(false);
            }}
          />
          <Button icon={Check} size={13} style="text" type="submit" />
        </FormikForm>
      </div>
    </Formik>
  );
};

export default Form;
