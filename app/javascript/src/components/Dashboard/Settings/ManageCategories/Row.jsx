import React, { useState } from "react";

import { Formik, Form } from "formik";
import { Delete, Close, Check, Edit, AddCircle } from "neetoicons";
import { Button, Typography } from "neetoui";
import { Input as FormikInput } from "neetoui/formik";
import { Draggable } from "react-beautiful-dnd";

import { categoriesApi } from "apis/admin";
import Tooltip from "components/Common/Tooltip";

import { EDIT_CATEGORY_FORM_VALIDATION_SCHEMA } from "./constants";
import DeleteAlert from "./DeleteAlert";

const Row = ({
  setSelectedCategoryId,
  selectedCategoryId,
  category,
  index,
  refetch,
  setShowAdd,
}) => {
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [selectedDeleteCategory, setSelectedDeleteCategory] = useState({});

  const handleSubmit = async values => {
    try {
      await categoriesApi.update(category.id, { name: values.name });
    } catch (error) {
      logger.error(error);
    }
    refetch();
  };

  const handleDelete = selectedCategory => {
    setSelectedDeleteCategory(selectedCategory);
    setShowDeleteAlert(prevState => !prevState);
  };

  return (
    <>
      <Draggable
        draggableId={category.id.toString()}
        index={index}
        key={category.id}
      >
        {provided => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            {selectedCategoryId === category.id ? (
              <div className="flex w-full">
                <AddCircle className="my-auto" size={16} />
                <Formik
                  initialValues={{ name: category.name }}
                  validationSchema={EDIT_CATEGORY_FORM_VALIDATION_SCHEMA}
                  onSubmit={handleSubmit}
                >
                  {({ isSubmitting, dirty }) => (
                    <Form className="my-2 w-full">
                      <FormikInput
                        className="mb-2 w-2/4"
                        name="name"
                        suffix={
                          <>
                            <Button
                              icon={Close}
                              size={13}
                              style="text"
                              type="reset"
                              onClick={() => setSelectedCategoryId(null)}
                            />
                            <Tooltip
                              content="Make change to save name."
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
              </div>
            ) : (
              <div className="flex h-12 justify-between">
                <div className="flex">
                  <AddCircle className="my-auto" size={16} />
                  <Typography className="my-auto ml-1 text-gray-700" style="h4">
                    {category.name}
                  </Typography>
                </div>
                <div className="my-auto flex items-end">
                  <Button
                    icon={Delete}
                    size={13}
                    style="text"
                    onClick={() => handleDelete(category)}
                  />
                  <Button
                    icon={Edit}
                    size={13}
                    style="text"
                    onClick={() => {
                      setSelectedCategoryId(category.id);
                      setShowAdd(false);
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </Draggable>
      {showDeleteAlert && (
        <DeleteAlert
          refetch={refetch}
          selectedDeleteCategory={selectedDeleteCategory}
          setSelectedDeleteCategory={setSelectedDeleteCategory}
          onClose={() => setShowDeleteAlert(false)}
        />
      )}
    </>
  );
};

export default Row;
