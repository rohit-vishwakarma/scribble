import React, { useState } from "react";

import { Check } from "neetoicons";
import { Input, Button } from "neetoui";

const Edit = ({ from, to, setShowEdit }) => {
  const [fromValue, setFromValue] = useState(from);
  const [toValue, setToValue] = useState(to);

  return (
    <>
      <td className="w-2/5">
        <Input value={fromValue} onChange={e => setFromValue(e.target.value)} />
      </td>
      <td className="w-2/5">
        <Input value={toValue} onChange={e => setToValue(e.target.value)} />
      </td>
      <td>
        <Button
          icon={Check}
          size={13}
          style="text"
          onClick={() => setShowEdit(prevState => !prevState)}
        />
      </td>
    </>
  );
};

export default Edit;
