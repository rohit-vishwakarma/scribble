import React, { useState, useEffect } from "react";

import { Warning, Info } from "neetoicons";
import {
  PageLoader,
  Modal,
  Button,
  Select,
  Typography,
  Callout,
} from "neetoui";

import { categoriesApi } from "apis/admin";
import Tooltip from "components/Common/Tooltip";

const DeleteAlert = ({
  onClose,
  refetch,
  selectedDeleteCategory,
  setSelectedDeleteCategory,
}) => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [moveToCategory, setMoveToCategory] = useState(null);

  const isOnlyGeneral =
    categories.length === 1 && selectedDeleteCategory.name === "General";

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

  const handleDelete = async () => {
    try {
      await categoriesApi.destroy({
        id: selectedDeleteCategory.id,
        newCategoryId: moveToCategory?.value,
      });
      setSelectedDeleteCategory({});
      refetch();
    } catch (error) {
      logger.error(error);
    }
    onClose();
  };

  const CATEGORY_OPTIONS = categories
    .map(category => ({
      label: category.name,
      value: category.id,
    }))
    .filter(category => category.value !== selectedDeleteCategory.id);

  if (loading) {
    return (
      <div className="h-screen w-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <Modal isOpen onClose={onClose}>
      <Modal.Header>
        <Typography id="dialog1Title" style="h2">
          Delete Category
        </Typography>
      </Modal.Header>
      <Modal.Body className="space-y-2">
        {isOnlyGeneral ? (
          <Callout className="mb-3" icon={Info} style="info">
            Category "{selectedDeleteCategory.name}" has&nbsp;
            {selectedDeleteCategory.count === 0
              ? "no article."
              : `${selectedDeleteCategory.count} articles. `}
            Last category "General" cannot be delete.
          </Callout>
        ) : (
          <>
            <Typography className="mb-3" style="h5">
              You are permanently deleting the "{selectedDeleteCategory.name}"
              category. This action cannot be undone. Are you sure you wish to
              continue?
            </Typography>
            {selectedDeleteCategory.count > 0 ? (
              <>
                {categories.length === 1 ? (
                  <Callout className="mb-3" icon={Info} style="info">
                    Category "{selectedDeleteCategory.name}" has&nbsp;
                    {selectedDeleteCategory.count === 0
                      ? "no article."
                      : `${selectedDeleteCategory.count} articles.
                      This will be moved to category "General". Click proceed to continue.`}
                  </Callout>
                ) : (
                  <Callout className="mb-3" icon={Warning} style="danger">
                    Category "{selectedDeleteCategory.name}" has&nbsp;
                    {selectedDeleteCategory.count} articles. Before this
                    category can be deleted, these articles needs to be moved to
                    another category. Select category to move all articles.
                  </Callout>
                )}
                {CATEGORY_OPTIONS.length > 0 && (
                  <Select
                    isSearchable
                    required
                    label="Select a category"
                    name="category_id"
                    options={CATEGORY_OPTIONS}
                    placeholder="Select Category"
                    onChange={e => setMoveToCategory(e)}
                  />
                )}
              </>
            ) : (
              <Callout className="mt-3" icon={Info} style="info">
                Category "{selectedDeleteCategory.name}" has no articles. Click
                proceed to delete this category.
              </Callout>
            )}
          </>
        )}
      </Modal.Body>
      <Modal.Footer className="flex space-x-2">
        <Tooltip
          content="Unable to proceed."
          followCursor="horizontal"
          position="bottom"
          disabled={
            (selectedDeleteCategory.count > 0 &&
              !moveToCategory &&
              CATEGORY_OPTIONS.length > 0) ||
            isOnlyGeneral
          }
        >
          <Button
            label="Proceed"
            style="danger"
            type="submit"
            disabled={
              (selectedDeleteCategory.count > 0 &&
                !moveToCategory &&
                CATEGORY_OPTIONS.length > 0) ||
              isOnlyGeneral
            }
            onClick={handleDelete}
          />
        </Tooltip>
        <Button label="Cancel" style="text" type="cancel" onClick={onClose} />
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteAlert;
