import React, { useState } from "react";

import { Typography } from "neetoui";

import { formatTimeStampToTimeAndDate } from "components/utils";

import Modal from "./Modal";

const VersionHistory = ({ article, articleVersions }) => {
  const [showModal, setShowModal] = useState(false);
  const [version, setVersion] = useState({});

  return (
    <div className="border-l h-screen w-1/4">
      <div className="mt-8 ml-4">
        <Typography style="h3">Version History</Typography>
        <Typography className="mt-1 text-gray-600" style="body1">
          Version history of {article.title} in Scribble.
        </Typography>
        <div className="mt-4">
          {articleVersions.map(version => (
            <div className="mt-3 flex gap-x-6" key={version.id}>
              <Typography className="text-gray-400" style="body2">
                {formatTimeStampToTimeAndDate(version.article.updated_at)}
              </Typography>
              <Typography
                className="cursor-pointer text-indigo-500"
                style="h4"
                onClick={() => {
                  setVersion(version);
                  setShowModal(true);
                }}
              >
                Article {version.article.version_status}
              </Typography>
            </div>
          ))}
        </div>
      </div>
      {showModal && (
        <Modal
          setShowModal={setShowModal}
          showModal={showModal}
          version={version}
        />
      )}
    </div>
  );
};

export default VersionHistory;
