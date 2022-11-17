import React, { useState } from "react";

import { DragDropContext, Droppable } from "react-beautiful-dnd";

import { categoriesApi } from "apis/admin";

import EditCategoryPane from "./Pane/Edit";
import Row from "./Row";

const List = ({
  categories,
  setCategories,
  refetch,
  selectedCategory,
  setSelectedCategory,
  setArticles,
}) => {
  const [showEditPane, setShowEditPane] = useState(false);
  const [selectedEditCategory, setSelectedEditCategory] = useState({});

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
                <div
                  key={category.id}
                  onClick={() => {
                    setSelectedCategory(category);
                    setArticles(category.articles);
                  }}
                >
                  <Row
                    category={category}
                    index={idx}
                    isSelectedCategory={selectedCategory.id === category.id}
                    refetch={refetch}
                    setSelectedEditCategory={setSelectedEditCategory}
                    setShowEditPane={setShowEditPane}
                  />
                </div>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <EditCategoryPane
        category={selectedEditCategory}
        refetch={refetch}
        setShowPane={setShowEditPane}
        showPane={showEditPane}
      />
    </>
  );
};

export default List;
