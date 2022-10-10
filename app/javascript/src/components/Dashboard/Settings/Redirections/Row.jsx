import React, { useState } from "react";

import { Delete, Edit as NeetoEdit } from "neetoicons";
import { Typography, Button } from "neetoui";

import Edit from "./Edit";

const Row = ({ from, to, isEdit }) => {
  const [showEdit, setShowEdit] = useState(isEdit);

  if (showEdit) {
    return <Edit from={from} setShowEdit={setShowEdit} to={to} />;
  }

  return (
    <>
      <td className="w-2/5">
        <Typography style="h5">{from}</Typography>
      </td>
      <td className="w-2/5">
        <Typography style="h5">{to}</Typography>
      </td>
      <td className="flex items-end">
        <Button icon={Delete} size={13} style="text" onClick={() => {}} />
        <Button
          icon={NeetoEdit}
          size={13}
          style="text"
          onClick={() => setShowEdit(prevState => !prevState)}
        />
      </td>
    </>
  );
};

export default Row;
