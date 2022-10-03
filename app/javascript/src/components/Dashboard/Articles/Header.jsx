import React, { useState, useMemo, useEffect } from "react";

import { AddCircle } from "neetoicons";
import { Button, ActionDropdown, Checkbox, Typography } from "neetoui";
import { Header } from "neetoui/layouts";

import { ARTICLE_FORM_PATH } from "../../routeConstants";

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
    const searchedArticlesList = searchArticles.filter(article =>
      article.title
        .toLowerCase()
        .replaceAll(" ", "")
        .includes(searchTerm.toLowerCase().replaceAll(" ", ""))
    );
    setArticles(searchedArticlesList);
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
          <Button
            icon={AddCircle}
            label="Add New Article"
            to={ARTICLE_FORM_PATH}
          />
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
