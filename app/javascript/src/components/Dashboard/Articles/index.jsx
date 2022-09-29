import React, { useState, useEffect } from "react";

import { AddCircle } from "neetoicons";
import {
  Button,
  PageLoader,
  ActionDropdown,
  Checkbox,
  Typography,
} from "neetoui";
import { Container, Header } from "neetoui/layouts";

import articlesApi from "apis/articles";

import { ColumnsListItems } from "./constants";
import EmptyState from "./EmptyState";
import List from "./List";
import MenuBar from "./Menu";

const Articles = () => {
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [columnsList, setColumnsList] = useState(ColumnsListItems);

  const { Menu, MenuItem } = ActionDropdown;

  const handleChecked = selectedIdx => {
    logger.info(ColumnsListItems);
    const items = ColumnsListItems;
    const selectedItem = items[selectedIdx];
    selectedItem.checked = !selectedItem.checked;
    setColumnsList([...items]);
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const { data } = await articlesApi.fetch();
      setArticles(data.articles);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div className="flex">
      <MenuBar />
      <Container>
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
                          checked={columnsList[idx].checked}
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
                onClick={() => {}}
              />
            </div>
          }
          searchProps={{
            value: searchTerm,
            onChange: e => setSearchTerm(e.target.value),
          }}
        />
        <Typography className="pb-6" style="h4">
          {articles.length}&nbsp;Articles
        </Typography>
        {articles.length ? (
          <List articles={articles} />
        ) : (
          <EmptyState
            primaryAction={() => {}}
            primaryActionLabel="Add New Article"
            subtitle="Add some articles"
            title="Looks like you don't have any articles!"
          />
        )}
      </Container>
    </div>
  );
};

export default Articles;
