import React, { useState, useMemo, useEffect } from "react";

import { AddCircle } from "neetoicons";
import { Button, ActionDropdown, Checkbox, Typography } from "neetoui";
import { Header } from "neetoui/layouts";

const ArticleHeader = ({
  columnsList,
  handleChecked,
  articles,
  setArticles,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const searchArticles = useMemo(() => articles, []);

  const { Menu, MenuItem } = ActionDropdown;

  useEffect(() => {
    if (searchTerm === "") {
      setArticles(searchArticles);

      return;
    }
    const searchedCategoriesList = articles.filter(article =>
      article.title.toLowerCase().includes(searchTerm)
    );
    setArticles(searchedCategoriesList);
  }, [searchTerm]);

  return (
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
                      onChange={() => handleChecked(idx)}
                    />
                  }
                >
                  {item.name}
                </MenuItem.Button>
              ))}
            </Menu>
          </ActionDropdown>
          <Button icon={AddCircle} label="Add New Article" onClick={() => {}} />
        </div>
      }
      searchProps={{
        value: searchTerm,
        onChange: e => setSearchTerm(e.target.value),
      }}
    />
  );
};

export default ArticleHeader;
