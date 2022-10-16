import React, { useState } from "react";

import { Delete, Edit as NeetoEdit } from "neetoicons";
import { Typography, Button } from "neetoui";

import DeleteAlert from "./DeleteAlert";

const Row = ({ redirection, setSelectedRedirectionId, refetch }) => {
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  return (
    <>
      <td className="w-2/5">
        <Typography className="text-gray-700" style="h5">
          {redirection.from}
        </Typography>
      </td>
      <td className="w-2/5">
        <Typography className="text-gray-700" style="h5">
          {redirection.to}
        </Typography>
      </td>
      <td className="flex items-end">
        <Button
          icon={Delete}
          size={13}
          style="text"
          onClick={() => setShowDeleteAlert(prevState => !prevState)}
        />
        <Button
          icon={NeetoEdit}
          size={13}
          style="text"
          onClick={() => setSelectedRedirectionId(redirection.id)}
        />
      </td>
      {showDeleteAlert && (
        <DeleteAlert
          refetch={refetch}
          selectedDeleteRedirection={redirection}
          onClose={() => setShowDeleteAlert(false)}
        />
      )}
    </>
  );
};

export default Row;
