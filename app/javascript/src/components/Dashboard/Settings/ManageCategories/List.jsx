import React from "react";

import { DragDropContext, Droppable } from "react-beautiful-dnd";

import Row from "./Row";

const List = ({ categories, setCategories, refetch }) => {
  const reorderList = (categoriesList, startIndex, endIndex) => {
    const shuffledCategories = Array.from(categoriesList);
    const [removed] = shuffledCategories.splice(startIndex, 1);
    shuffledCategories.splice(endIndex, 0, removed);

    return shuffledCategories;
  };

  const handleDragEnd = endPosition => {
    if (!endPosition.destination) return;

    const reorderedCategories = reorderList(
      categories,
      endPosition.source.index,
      endPosition.destination.index
    );
    setCategories(reorderedCategories);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="droppable-categories">
        {provided => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {categories.map((category, idx) => (
              <div key={category.id}>
                <hr />
                <Row category={category} index={idx} refetch={refetch} />
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
