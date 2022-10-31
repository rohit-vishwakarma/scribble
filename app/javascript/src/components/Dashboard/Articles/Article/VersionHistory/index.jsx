import React, { useState } from "react";

import { Typography } from "neetoui";

import { ARTICLE_VERSION_HISTORY_DATA } from "./constants";
import Modal from "./Modal";

const VersionHistory = ({ article }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="border-l h-screen max-w-sm">
      <div className="mt-8 ml-4">
        <Typography style="h3">Version History</Typography>
        <Typography className="text-gray-600" style="body1">
          Version history of Setting up an account in Scribble.
        </Typography>
        <div className="mt-4">
          {ARTICLE_VERSION_HISTORY_DATA.map(article => (
            <div className="mt-3 flex gap-x-6" key={article.id}>
              <Typography className="text-gray-400" style="body2">
                {article.timeAndDate}
              </Typography>
              <Typography
                className="cursor-pointer text-indigo-500"
                style="h4"
                onClick={() => setShowModal(true)}
              >
                Article {article.status}
              </Typography>
            </div>
          ))}
        </div>
      </div>
      <Modal
        article={article}
        setShowModal={setShowModal}
        showModal={showModal}
      />
    </div>
  );
};

export default VersionHistory;
