import React, { useState } from "react";

import { Formik, Form } from "formik";
import { Plus, Check, Close } from "neetoicons";
import { Button } from "neetoui";
import { Input as FormikInput } from "neetoui/formik";

import { categoriesApi } from "apis/admin";

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
        <Formik initialValues={{ name: "" }} onSubmit={handleSubmit}>
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
                  <Button icon={Check} size={13} style="text" type="submit" />
                </>
              }
            />
          </Form>
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
