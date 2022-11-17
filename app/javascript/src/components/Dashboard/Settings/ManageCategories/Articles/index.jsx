import React, { useState } from "react";

import { Typography, Select, Alert } from "neetoui";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import Tooltip from "components/Common/Tooltip";

import Article from "./Article";

const Articles = ({ categories, selectedCategory, articles, setArticles }) => {
  const [selectedArticleIds, setSelectedArticleIds] = useState([]);
  const [moveToCategory, setMoveToCategory] = useState({});
  const [isMoveToCategory, setIsMoveToCategory] = useState(false);

  const CATEGORY_OPTIONS = categories
    .filter(category => category.id !== selectedCategory.id)
    .map(category => ({
      label: category.name,
      value: category.id,
    }));

  const handleSubmit = category => {
    setIsMoveToCategory(true);
    setMoveToCategory(category);
  };

  const reorderList = (articleList, startIndex, endIndex) => {
    const shuffledArticles = Array.from(articleList);
    const [removed] = shuffledArticles.splice(startIndex, 1);
    shuffledArticles.splice(endIndex, 0, removed);

    return shuffledArticles;
  };

  const handleDragEnd = async endPosition => {
    if (!endPosition.destination) return;

    const reorderedArticles = reorderList(
      articles,
      endPosition.source.index,
      endPosition.destination.index
    );
    setArticles(reorderedArticles);
  };

  return (
    <div className="h-screen w-full overflow-y-auto bg-white p-4">
      <div className="fixed top-0 z-40 flex w-1/2 justify-between bg-white pr-8 pt-24">
        <Typography className="mr-48 mt-2 h-10" style="h2">
          Manage articles
        </Typography>
        <Tooltip
          disabled={selectedArticleIds.length === 0 || categories.length === 1}
          followCursor="horizontal"
          position="top"
          content={
            categories.length === 1
              ? "Add a category first to move article."
              : "Select an article to move into category"
          }
        >
          <Select
            isSearchable
            isDisabled={selectedArticleIds.length === 0}
            label="Move to category:"
            options={CATEGORY_OPTIONS}
            placeholder="Search or select a category here"
            size="large"
            onChange={category => handleSubmit(category)}
          />
        </Tooltip>
      </div>
      <div className="mt-16 mb-4 p-2">
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="droppable-articles">
            {provided => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {articles.map((article, index) => (
                  <Article
                    article={article}
                    index={index}
                    key={article.id}
                    selectedArticleIds={selectedArticleIds}
                    setSelectedArticleIds={setSelectedArticleIds}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      {isMoveToCategory && (
        <Alert
          isOpen={open}
          message={`Are you sure you want to continue moving these articles to category "${moveToCategory.label}"? This cannot be undone.`}
          title={`Moving ${selectedArticleIds.length} articles to "${moveToCategory.label}"`}
          onClose={() => setIsMoveToCategory(false)}
          onSubmit={() => setIsMoveToCategory(false)}
        />
      )}
    </div>
  );
};

export default Articles;
