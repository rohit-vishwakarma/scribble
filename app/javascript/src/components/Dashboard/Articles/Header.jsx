import React from "react";

import { AddCircle } from "neetoicons";
import { Button, ActionDropdown, Checkbox, Typography } from "neetoui";
import { Header } from "neetoui/layouts";

import { ARTICLE_CREATE_PATH } from "../../routeConstants";

const { Menu, MenuItem } = ActionDropdown;

const ArticleHeader = ({
  columnsList,
  handleCheckedColumns,
  searchArticleTerm,
  setSearchArticleTerm,
}) => (
  <Header
    actionBlock={
      <div>
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
        <Button
          icon={AddCircle}
          label="Add New Article"
          to={ARTICLE_CREATE_PATH}
        />
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
