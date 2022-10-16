import React, { useState } from "react";

import { Alert, Toastr } from "neetoui";

import redirectionsApi from "apis/redirections";

const DeleteAlert = ({ refetch, onClose, selectedDeleteRedirection }) => {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setDeleting(true);
      await redirectionsApi.destroy(selectedDeleteRedirection.id);
      Toastr.success("Redirection Link is deleted Successfully");
      onClose();
      refetch();
    } catch (error) {
      logger.error(error);
      setDeleting(false);
    }
  };

  return (
    <Alert
      isOpen
      isSubmitting={deleting}
      message={`Are you sure you want to continue deleting "${selectedDeleteRedirection.from}" redirection? This cannot be undone.`}
      title="Delete Redirection"
      onClose={onClose}
      onSubmit={handleDelete}
    />
  );
};

export default DeleteAlert;
