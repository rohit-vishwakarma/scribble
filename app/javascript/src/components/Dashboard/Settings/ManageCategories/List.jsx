import React, { useState, useEffect } from "react";

import { DragDropContext, Droppable } from "react-beautiful-dnd";

import { categoriesApi } from "apis/admin";

import Row from "./Row";

const List = ({ categories, setCategories, refetch, setShowAdd }) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  useEffect(() => {
    window.addEventListener("keydown", event => {
      if (event.key === "Escape") {
        setSelectedCategoryId(null);
      }
    });
  }, []);

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
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="droppable-categories">
        {provided => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {categories.map((category, idx) => (
              <div className="w-full" key={category.id}>
                <hr />
                <Row
                  category={category}
                  index={idx}
                  refetch={refetch}
                  selectedCategoryId={selectedCategoryId}
                  setSelectedCategoryId={setSelectedCategoryId}
                  setShowAdd={setShowAdd}
                />
              </div>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default List;
