import React, { useState, useEffect } from "react";

import { Warning } from "neetoicons";
import { PageLoader, Alert, Select, Typography, Callout } from "neetoui";

import articlesApi from "apis/articles";
import categoriesApi from "apis/categories";

const DeleteAlert = ({
  onClose,
  refetch,
  selectedDeleteCategory,
  setSelectedDeleteCategory,
}) => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [deleting, setDeleting] = useState(false);
  const [moveToCategory, setMoveToCategory] = useState(null);
  const [showWarning, setShowWarning] = useState(false);

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
    if (moveToCategory === null) {
      setShowWarning(true);

      return;
    }
    try {
      setDeleting(true);
      if (categories.length === 1) {
        await categoriesApi.update(selectedDeleteCategory.id, {
          name: "General",
        });
      } else {
        await articlesApi.bulkUpdate({
          delete_id: selectedDeleteCategory.id,
          update_id: moveToCategory.value,
        });
        await categoriesApi.destroy(selectedDeleteCategory.id);
      }
      setSelectedDeleteCategory({});
      refetch();
    } catch (error) {
      logger.error(error);
    }
    onClose();
  };

  if (loading) {
    return <PageLoader />;
  }

  const filteredCategoryOptions = categories
    .map(category => ({
      label: category.name,
      value: category.id,
    }))
    .filter(category => category.value !== selectedDeleteCategory.id);

  const CATEGORY_OPTIONS =
    filteredCategoryOptions.length > 0
      ? filteredCategoryOptions
      : [{ label: "General", value: 0 }];

  return (
    <Alert
      isOpen
      isSubmitting={deleting}
      submitButtonLabel="Proceed"
      title="Delete Category"
      message={
        <>
          <Typography className="mb-3" style="h5">
            You are permanently deleting the "{selectedDeleteCategory.name}"
            category. This action cannot be undone. Are you sure you wish to
            continue?
          </Typography>
          <Callout className="mb-3" icon={Warning} style="danger">
            Category "{selectedDeleteCategory.name}" has&nbsp;
            {selectedDeleteCategory.count} articles. Before this category can be
            deleted, these articles needs to be moved to another category.
          </Callout>
          <Select
            isSearchable
            required
            label="Select a category to move these articles into"
            name="category_id"
            options={CATEGORY_OPTIONS}
            placeholder="Select Category"
            onChange={e => {
              setShowWarning(false);
              setMoveToCategory(e);
            }}
          />
          {showWarning && (
            <Callout className="mt-3" icon={Warning} style="warning">
              Please select a category first to move the articles.
            </Callout>
          )}
        </>
      }
      onClose={onClose}
      onSubmit={handleDelete}
    />
  );
};

export default DeleteAlert;
