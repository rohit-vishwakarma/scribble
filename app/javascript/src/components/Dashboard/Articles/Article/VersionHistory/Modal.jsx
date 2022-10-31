import React from "react";

import {
  Modal as NeetoUIModal,
  Typography,
  Button,
  Input,
  Textarea,
} from "neetoui";

const Modal = ({ article, showModal, setShowModal }) => (
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
    <NeetoUIModal.Body className="space-y-2 ">
      <div className="my-5 flex gap-x-4">
        <Input
          disabled
          className="bg-slate-700 mr-3 w-5/12"
          label="Article Title"
          value={article.title}
        />
        <Input
          disabled
          className="w-56"
          label="Category"
          value={article.category.name}
        />
      </div>
      <Textarea disabled label="Article Body" rows={30} value={article.body} />
    </NeetoUIModal.Body>
    <NeetoUIModal.Footer className="space-x-2">
      <Button label="Restore version" onClick={() => setShowModal(false)} />
      <Button label="Cancel" style="text" onClick={() => setShowModal(false)} />
    </NeetoUIModal.Footer>
  </NeetoUIModal>
);

export default Modal;
