import React, { useState } from "react";

import { Formik, Form } from "formik";
import { Plus, Search, Close, Check } from "neetoicons";
import { Typography, Button } from "neetoui";
import { Input as FormikInput } from "neetoui/formik";
import { MenuBar } from "neetoui/layouts";

import categoriesApi from "apis/categories";

import {
  filterArticlesAccordingToCategory,
  filterArticlesAccordingToStatus,
} from "./utils";

const Menu = ({ categories, refetch, allArticles, setAllArticles }) => {
  const [isCollapsed, setIsCollapsed] = useState({ add: true, search: true });
  const [searchValue, setSearchValue] = useState("");
  const [activeStatus, setActiveStatus] = useState("All");
  const [activeCategories, setActiveCategories] = useState([]);

  const MenuBarBlocks = [
    {
      label: "All",
      count: allArticles.selected.length,
      active: true,
    },
    {
      label: "Draft",
      count: allArticles.selected.filter(article => article.status === "Draft")
        .length,
      active: false,
    },
    {
      label: "Published",
      count: allArticles.selected.filter(
        article => article.status === "Published"
      ).length,
      active: false,
    },
  ];

  const handleSubmit = async values => {
    try {
      setIsCollapsed({ ...isCollapsed, add: !isCollapsed.add });
      await categoriesApi.create({ name: values.name });
      refetch();
    } catch (error) {
      logger.error(error);
    }
  };

  const handleActiveBlock = dataLabel => {
    filterArticlesAccordingToStatus(
      dataLabel,
      allArticles,
      setAllArticles,
      setActiveStatus,
      activeCategories
    );
  };

  const handleActiveCategories = category => {
    filterArticlesAccordingToCategory(
      category,
      activeCategories,
      setActiveCategories,
      allArticles,
      setAllArticles,
      setActiveStatus
    );
  };

  return (
    <MenuBar showMenu title="Articles">
      {MenuBarBlocks.map(menuBarBlock => (
        <MenuBar.Block
          active={menuBarBlock.label === activeStatus}
          count={menuBarBlock.count}
          key={menuBarBlock.label}
          label={menuBarBlock.label}
          onClick={() => handleActiveBlock(menuBarBlock.label)}
        />
      ))}
      <MenuBar.SubTitle
        iconProps={[
          {
            icon: Search,
            onClick: () => {
              setIsCollapsed({ add: true, search: !isCollapsed.search });
              setSearchValue("");
            },
          },
          {
            icon: isCollapsed.add ? Plus : Close,
            onClick: () => {
              setIsCollapsed({ search: true, add: !isCollapsed.add });
              setSearchValue("");
            },
          },
        ]}
      >
        <Typography
          component="h4"
          style="h5"
          textTransform="uppercase"
          weight="bold"
        >
          CATEGORIES
        </Typography>
      </MenuBar.SubTitle>
      <MenuBar.Search
        collapse={isCollapsed.search}
        value={searchValue}
        onChange={e => setSearchValue(e.target.value)}
        onCollapse={() => {
          setIsCollapsed({ ...isCollapsed, search: true });
          setSearchValue("");
        }}
      />
      {!isCollapsed.add && (
        <div>
          <Formik initialValues={{ name: "" }} onSubmit={handleSubmit}>
            <Form>
              <FormikInput
                className="mb-5"
                name="name"
                suffix={<Button icon={Check} style="text" type="submit" />}
              />
            </Form>
          </Formik>
        </div>
      )}
      {categories
        .filter(category =>
          category.name
            .toLowerCase()
            .replaceAll(" ", "")
            .includes(searchValue.toLowerCase().replaceAll(" ", ""))
        )
        .map(category => (
          <MenuBar.Block
            active={activeCategories.includes(category.id)}
            count={category.count}
            key={category.id}
            label={category.name}
            onClick={() => handleActiveCategories(category)}
          />
        ))}
    </MenuBar>
  );
};

export default Menu;
