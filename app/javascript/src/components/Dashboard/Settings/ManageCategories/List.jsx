import React, { useState } from "react";

import { DragDropContext, Droppable } from "react-beautiful-dnd";

import { categoriesApi } from "apis/admin";

import EditCategoryPane from "./Pane/Edit";
import Row from "./Row";

const List = ({ categories, setCategories, refetch }) => {
  const [showEditPane, setShowEditPane] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState({});

  const reorderList = (categoryList, startIndex, endIndex) => {
    const shuffledCategories = Array.from(categoryList);
    const [removed] = shuffledCategories.splice(startIndex, 1);
    shuffledCategories.splice(endIndex, 0, removed);

    return shuffledCategories;
  };

  const handleDragEnd = async endPosition => {
    if (!endPosition.destination) return;

    const reorderedCategories = reorderList(
      categories,
      endPosition.source.index,
      endPosition.destination.index
    );
    setCategories(reorderedCategories);
    const categoryId = endPosition.draggableId;
    const newPosition = endPosition.destination.index + 1;
    try {
      await categoriesApi.positionUpdate({
        id: categoryId,
        new_position: newPosition,
      });
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="droppable-categories">
          {provided => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {categories.map((category, idx) => (
                <Row
                  category={category}
                  index={idx}
                  key={category.id}
                  refetch={refetch}
                  setSelectedCategory={setSelectedCategory}
                  setShowEditPane={setShowEditPane}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <EditCategoryPane
        category={selectedCategory}
        refetch={refetch}
        setShowPane={setShowEditPane}
        showPane={showEditPane}
      />
    </>
  );
};

export default List;
