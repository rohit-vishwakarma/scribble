import React, { useState } from "react";

import { Formik, Form } from "formik";
import { Plus, Check } from "neetoicons";
import { Button } from "neetoui";
import { Input as FormikInput } from "neetoui/formik";

import categoriesApi from "apis/categories";

const Add = ({ refetch }) => {
  const [showAdd, setShowAdd] = useState(false);
  const [addValue, setAddValue] = useState("");

  const handleSubmit = async () => {
    try {
      setShowAdd(prevState => !prevState);
      if (addValue === "") return;

      await categoriesApi.create({ name: addValue });
      setAddValue("");
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
              suffix={<Button icon={Check} style="text" type="submit" />}
              value={addValue}
              onChange={e => setAddValue(e.target.value)}
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
