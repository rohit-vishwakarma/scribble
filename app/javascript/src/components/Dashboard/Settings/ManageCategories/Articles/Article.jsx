import React from "react";

import { Clock } from "neetoicons";
import { Typography, Checkbox, Avatar } from "neetoui";

import Tooltip from "components/Common/Tooltip";
import {
  calculateCreatedAgo,
  formatTimeStampToDayDateAndTime,
} from "components/utils";

const Article = ({ article, selectedArticleIds, setSelectedArticleIds }) => {
  const articleCreatedAgo = calculateCreatedAgo(article.created_at);
  const articleDayDateAndTime = formatTimeStampToDayDateAndTime(
    article.create_at
  );

  const handleSelect = () => {
    if (selectedArticleIds.includes(article.id)) {
      const filteredSelectedIds = selectedArticleIds.filter(
        articleId => articleId !== article.id
      );
      setSelectedArticleIds(filteredSelectedIds);
    } else {
      setSelectedArticleIds(prevState => [...prevState, article.id]);
    }
  };

  return (
    <div className="rounded border shadow my-5 flex w-full flex-col border-solid border-gray-200 p-5 pb-2">
      <Checkbox className="pb-1" onChange={handleSelect} />
      <Typography className="mb-2 flex text-xl font-bold" style="h4">
        {article.title}
      </Typography>
      <Typography className="truncate mb-4 flex text-left" style="body2">
        {article.body}
      </Typography>
      <hr />
      <div className="mt-2 flex w-full items-center justify-end">
        <span className="flex justify-between gap-x-2">
          <Clock />
          <Tooltip
            disabled
            content={`${articleDayDateAndTime} (${articleCreatedAgo})`}
            followCursor="horizontal"
            position="top"
          >
            <Typography className="mt-1" style="body3">
              {article.status} {articleCreatedAgo}
            </Typography>
          </Tooltip>
          {article.status === "Draft" ? (
            <div className="flex gap-x-2">
              <Avatar
                user={{
                  name: article.author.name,
                }}
              />
              <Typography
                className="rounded-lg bg-yellow-100 p-2 text-gray-700"
                style="h5"
              >
                Draft
              </Typography>
            </div>
          ) : (
            <Typography
              className="rounded-lg bg-indigo-100 p-2 text-gray-700"
              style="h5"
            >
              Published
            </Typography>
          )}
        </span>
      </div>
    </div>
  );
};

export default Article;
