import React, { useState } from "react";

import { Delete, Edit, Check, AddCircle } from "neetoicons";
import { Button, Typography, Input } from "neetoui";
import { Draggable } from "react-beautiful-dnd";

import categoriesApi from "apis/categories";

import DeleteAlert from "./DeleteAlert";

const Row = ({ category, index, refetch }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [editName, setEditName] = useState(category.name);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [selectedDeleteCategory, setSelectedDeleteCategory] = useState({});

  const handleEdit = async () => {
    try {
      setIsEdit(prevState => !prevState);
      if (editName === "" || editName === category.name) return;

      await categoriesApi.update(category.id, { name: editName });
    } catch (error) {
      logger.error(error);
    }
    refetch();
  };

  const handleDelete = selectedCategory => {
    setSelectedDeleteCategory(selectedCategory);
    setShowDeleteAlert(prevState => !prevState);
  };

  return (
    <>
      <Draggable
        draggableId={category.id.toString()}
        index={index}
        key={category.id}
      >
        {provided => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            {isEdit ? (
              <div className="flex w-2/4">
                <AddCircle className="my-auto" size={16} />
                <Input
                  className="my-2"
                  value={editName}
                  suffix={
                    <Check className="cursor-pointer" onClick={handleEdit} />
                  }
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
                  <Button
                    icon={Delete}
                    size={13}
                    style="text"
                    onClick={() => handleDelete(category)}
                  />
                  <Button
                    icon={Edit}
                    size={13}
                    style="text"
                    onClick={() => setIsEdit(prevState => !prevState)}
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </Draggable>
      {showDeleteAlert && (
        <DeleteAlert
          refetch={refetch}
          selectedDeleteCategory={selectedDeleteCategory}
          setSelectedDeleteCategory={setSelectedDeleteCategory}
          onClose={() => setShowDeleteAlert(false)}
        />
      )}
    </>
  );
};

export default Row;
