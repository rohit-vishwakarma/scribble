import React from "react";

import dayjs from "dayjs";
import { Delete, Edit } from "neetoicons";
import { Typography } from "neetoui";

import { ColumnsListItems } from "../constants";

export const formatCreatedTimeToDate = dateTime =>
  dayjs(dateTime).format("MMMM Do, YYYY");

export const buildArticleTableColumnData = (handleDelete, handleEdit) => {
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
      render: (created_at, { status }) =>
        status === "Draft" ? (
          <Typography className="text-gray-500" style="h5">
            ----------
          </Typography>
        ) : (
          <Typography className="text-gray-800" style="h5">
            {formatCreatedTimeToDate(created_at)}
          </Typography>
        ),
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
      width: "20%",
      render: () => (
        <Typography className="text-gray-600" style="h5">
          Oliver Smith
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
    render: (id, { title, description, category_id, status }) => (
      <div className="flex items-end gap-x-3">
        <Delete size={13} onClick={() => handleDelete({ id, title })} />
        <Edit
          size={13}
          onClick={() =>
            handleEdit({ id, title, description, category_id, status })
          }
        />
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
