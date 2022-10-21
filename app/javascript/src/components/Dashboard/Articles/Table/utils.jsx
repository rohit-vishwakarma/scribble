import React from "react";

import { Delete, Edit } from "neetoicons";
import { Typography, Button } from "neetoui";

import { formatTimeStampToDate } from "components/utils";

import { ColumnsListItems } from "../constants";

export const buildArticleTableColumnData = handleDelete => {
  const ArticleColumnsData = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: "25%",
      render: title => (
        <Typography className="text-indigo-500" lineHeight="loose" style="h5">
          {title}
        </Typography>
      ),
    },
    {
      title: "Date",
      dataIndex: "updated_at",
      key: "updated_at",
      width: "20%",
      render: (updated_at, { status }) =>
        status === "Draft" ? (
          <Typography className="text-gray-500" style="h5">
            ----------
          </Typography>
        ) : (
          <Typography className="text-gray-800" style="h5">
            {formatTimeStampToDate(updated_at)}
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
          {author.name}
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
          {category.name}
        </Typography>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "15%",
      render: status => (
        <Typography className="text-gray-600" style="h5">
          {status}
        </Typography>
      ),
    },
  ];

  const optionColumn = {
    title: "",
    dataIndex: "id",
    key: "option",
    width: "10%",
    render: (_, { id, title }) => (
      <div className="flex items-end">
        <Button
          icon={Delete}
          size={13}
          style="text"
          onClick={() => handleDelete({ title, id })}
        />
        <Button icon={Edit} size={13} style="text" to={`/article/${id}/edit`} />
      </div>
    ),
  };

  const checkedColumnsList = ColumnsListItems.filter(
    ele => ele.checked === true
  ).map(ele => ele.dataIndex);

  const filteredColumnData = ArticleColumnsData.filter(ele =>
    checkedColumnsList.includes(ele.dataIndex)
  );

  if (filteredColumnData.length > 0) {
    filteredColumnData.push(optionColumn);
  }

  return filteredColumnData;
};
