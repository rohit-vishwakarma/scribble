import React from "react";

import { Button, ActionDropdown, Checkbox, Typography } from "neetoui";
import { Header } from "neetoui/layouts";

import Tooltip from "components/Common/Tooltip";
import { ARTICLE_CREATE_PATH } from "components/routeConstants";

const { Menu, MenuItem } = ActionDropdown;

const ArticleHeader = ({
  disabled,
  columnsList,
  handleCheckedColumns,
  searchArticleTerm,
  setSearchArticleTerm,
}) => (
  <Header
    actionBlock={
      <div className="flex">
        <ActionDropdown
          buttonStyle="secondary"
          className="pr-3"
          label="Columns"
        >
          <Menu>
            <Typography className="pt-2.5 pl-3" style="h5">
              Columns
            </Typography>
            {columnsList.map((item, idx) => (
              <MenuItem.Button
                key={idx}
                prefix={
                  <Checkbox
                    checked={item.checked}
                    id={item.value}
                    onChange={() => handleCheckedColumns(idx)}
                  />
                }
              >
                {item.name}
              </MenuItem.Button>
            ))}
          </Menu>
        </ActionDropdown>
        <Tooltip
          content="Add category to create an article"
          disabled={disabled}
          followCursor="horizontal"
          position="bottom"
        >
          <Button
            disabled={disabled}
            label="Add new article"
            to={disabled ? "/" : ARTICLE_CREATE_PATH}
          />
        </Tooltip>
      </div>
    }
    searchProps={{
      placeholder: "Search article title",
      value: searchArticleTerm,
      onChange: e => setSearchArticleTerm(e.target.value),
    }}
  />
);

export default ArticleHeader;
