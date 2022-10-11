import React, { useState } from "react";

import { Plus, Check } from "neetoicons";
import { Button, Input } from "neetoui";

import categoriesApi from "apis/categories";

const Add = ({ refetch }) => {
  const [showAdd, setShowAdd] = useState(false);
  const [addValue, setAddValue] = useState("");

  const handleClick = async () => {
    try {
      setShowAdd(prevState => !prevState);
      if (addValue === "") return;

      await categoriesApi.create({ name: addValue });
      setAddValue("");
      refetch();
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <>
      {showAdd ? (
        <Input
          className="mb-2 w-2/4"
          suffix={<Check className="cursor-pointer" onClick={handleClick} />}
          value={addValue}
          onChange={e => setAddValue(e.target.value)}
        />
      ) : (
        <Button
          className="mb-5"
          icon={Plus}
          iconPosition="left"
          label="Add new category"
          style="link"
          onClick={() => setShowAdd(prevState => !prevState)}
        />
      )}
    </>
  );
};

export default Add;
