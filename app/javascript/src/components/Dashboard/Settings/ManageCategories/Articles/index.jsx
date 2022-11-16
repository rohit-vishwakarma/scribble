import React, { useState } from "react";

import { Typography, Select, Alert } from "neetoui";

import Tooltip from "components/Common/Tooltip";

import Article from "./Article";

const Articles = ({ categories, selectedCategory }) => {
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
        {selectedCategory.articles.map(article => (
          <Article
            article={article}
            key={article.id}
            selectedArticleIds={selectedArticleIds}
            setSelectedArticleIds={setSelectedArticleIds}
          />
        ))}
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
