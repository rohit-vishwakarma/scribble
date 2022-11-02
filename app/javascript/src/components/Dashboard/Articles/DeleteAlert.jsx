import React, { useState } from "react";

import { Alert } from "neetoui";

import { articlesApi } from "apis/admin";

const DeleteAlert = ({
  refetch,
  onClose,
  selectedDeleteArticle,
  setSelectedDeleteArticle,
}) => {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setDeleting(true);
      await articlesApi.destroy(selectedDeleteArticle.id);
      setSelectedDeleteArticle({});
      refetch();
      onClose();
    } catch (error) {
      logger.error(error);
      setDeleting(false);
    }
  };

  return (
    <Alert
      isOpen
      isSubmitting={deleting}
      message={`Are you sure you want to continue deleting "${selectedDeleteArticle.title}" article? This cannot be undone.`}
      title="Delete Article"
      onClose={onClose}
      onSubmit={handleDelete}
    />
  );
};

export default DeleteAlert;
