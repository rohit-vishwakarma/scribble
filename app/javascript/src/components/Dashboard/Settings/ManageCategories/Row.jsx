import React, { useState } from "react";

import { MenuVertical } from "neetoicons";
import { Typography, Dropdown } from "neetoui";
import { Draggable } from "react-beautiful-dnd";

import DeleteAlert from "./DeleteAlert";

const { Menu, MenuItem } = Dropdown;

const Row = ({
  category,
  index,
  refetch,
  setSelectedCategory,
  setShowEditPane,
}) => {
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [selectedDeleteCategory, setSelectedDeleteCategory] = useState({});

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
            <div className="flex h-16 justify-between p-2">
              <Typography className="my-auto ml-1 text-gray-700" style="h4">
                {category.name}
              </Typography>
              <div className="my-auto flex items-end">
                <Dropdown buttonStyle="text" icon={MenuVertical}>
                  <Menu>
                    <MenuItem.Button
                      onClick={() => {
                        setSelectedCategory(category);
                        setShowEditPane(true);
                      }}
                    >
                      Edit
                    </MenuItem.Button>
                    <MenuItem.Button
                      style="danger"
                      onClick={() => handleDelete(category)}
                    >
                      Delete
                    </MenuItem.Button>
                  </Menu>
                </Dropdown>
              </div>
            </div>
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
