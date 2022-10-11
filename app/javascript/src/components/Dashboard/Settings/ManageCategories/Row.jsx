import React, { useState } from "react";

import { Delete, Edit, Check, AddCircle } from "neetoicons";
import { Button, Typography, Input } from "neetoui";

import categoriesApi from "apis/categories";

const Row = ({ category, refetch }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [editName, setEditName] = useState(category.name);

  const handleClick = async () => {
    try {
      setIsEdit(prevState => !prevState);
      if (editName === "" || editName === category.name) return;

      await categoriesApi.update(category.id, { name: editName });
    } catch (error) {
      logger.error(error);
    }
    refetch();
  };

  return (
    <>
      {isEdit ? (
        <div className="flex w-2/4">
          <AddCircle className="my-auto" size={16} />
          <Input
            className="my-2"
            suffix={<Check className="cursor-pointer" onClick={handleClick} />}
            value={editName}
            onChange={e => setEditName(e.target.value)}
          />
        </div>
      ) : (
        <div className="flex h-12 justify-between">
          <div className="flex">
            <AddCircle className="my-auto" size={16} />
            <Typography className="my-auto ml-1 text-gray-700" style="h4">
              {category.name}
            </Typography>
          </div>
          <div className="my-auto flex items-end">
            <Button icon={Delete} size={13} style="text" onClick={() => {}} />
            <Button
              icon={Edit}
              size={13}
              style="text"
              onClick={() => setIsEdit(prevState => !prevState)}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Row;
