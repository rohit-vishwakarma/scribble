import React from "react";

import {
  Modal as NeetoUIModal,
  Typography,
  Button,
  Input,
  Textarea,
} from "neetoui";
import { useHistory } from "react-router-dom";

import { articlesApi } from "apis/admin";
import Tooltip from "components/Common/Tooltip";

const Modal = ({ version, showModal, setShowModal }) => {
  const history = useHistory();

  const categoryValue = version.category
    ? version.category.name
    : "Category doesn't exists.";
  const isRestored = version.article.version_status;

  const handleRestore = async () => {
    try {
      const articleData = {
        title: version.article.title,
        body: version.article.body,
        status: "Draft",
        category_id: version.article.category_id,
        version_status: true,
        restored_at: version.article.updated_at,
      };
      await articlesApi.update(version.article.id, articleData);
      history.go(0);
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <NeetoUIModal
      isOpen={showModal}
      size="large"
      onClose={() => setShowModal(false)}
    >
      <NeetoUIModal.Header description="Version history of Setting up an account in Scribble.">
        <Typography id="dialog1Title" style="h2">
          Version History
        </Typography>
      </NeetoUIModal.Header>
      <NeetoUIModal.Body className="space-y-2">
        <div className="my-5 flex gap-x-4">
          <Input
            disabled
            className="bg-slate-700 mr-3 w-5/12"
            label="Article Title"
            value={version.article.title}
          />
          <Input
            disabled
            className="w-56"
            label="Category"
            value={categoryValue}
          />
        </div>
        <Textarea
          disabled
          label="Article Body"
          rows={30}
          value={version.article.body}
        />
      </NeetoUIModal.Body>
      <NeetoUIModal.Footer className="flex space-x-2">
        <Tooltip
          disabled={!version.category || isRestored}
          followCursor="horizontal"
          position="top"
          content={
            isRestored
              ? "Already restored article can't be restore."
              : "Category doesn't exists, unable to restore."
          }
        >
          <Button
            disabled={!version.category || isRestored}
            label="Restore version"
            onClick={handleRestore}
          />
        </Tooltip>
        <Button
          label="Cancel"
          style="text"
          onClick={() => setShowModal(false)}
        />
      </NeetoUIModal.Footer>
    </NeetoUIModal>
  );
};

export default Modal;
