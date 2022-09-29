import React from "react";

import { Typography } from "neetoui";

export const buildArticleTableColumnData = [
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
    width: "20%",
    render: title => (
      <Typography className="text-indigo-500" lineHeight="loose" style="h5">
        {title}
      </Typography>
    ),
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    width: "20%",
    render: date => (
      <Typography className="text-gray-800" style="h5">
        {date}
      </Typography>
    ),
  },
  {
    title: "Author",
    dataIndex: "author",
    key: "author",
    width: "20%",
    render: author => (
      <Typography className="text-gray-600" style="h5">
        {author}
      </Typography>
    ),
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
    width: "20%",
    render: category => (
      <Typography className="text-gray-600" style="h5">
        {category}
      </Typography>
    ),
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    width: "20%",
    render: status => (
      <Typography className="text-gray-600" style="h5">
        {status}
      </Typography>
    ),
  },
];
