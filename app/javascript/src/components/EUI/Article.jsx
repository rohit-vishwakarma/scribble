import React from "react";

import { Typography } from "neetoui";

import { formatTimeStampToDate } from "components/util";

const Article = ({ article }) => (
  <div className="m-8 w-3/4">
    <Typography className="text-gray-800" style="h1">
      {article.title}
    </Typography>
    <div className="mt-2 flex">
      <Typography
        className="neeto-ui-rounded neeto-ui-bg-primary-100 neeto-ui-text-primary-800 mr-4 py-1 px-3"
        style="h5"
      >
        {article.category.name}
      </Typography>
      <Typography className="neeto-ui-text-gray-400 p-1" style="h5">
        {formatTimeStampToDate(article.update_at)}
      </Typography>
    </div>
    <Typography className="mt-6" style="body2">
      {article.body}
    </Typography>
  </div>
);

export default Article;
