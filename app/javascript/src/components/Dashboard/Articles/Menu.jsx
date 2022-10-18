import React, { useState, useMemo } from "react";

import { Formik, Form } from "formik";
import { Plus, Search, Close, Check } from "neetoicons";
import { Typography, Button } from "neetoui";
import { Input as FormikInput } from "neetoui/formik";
import { MenuBar } from "neetoui/layouts";

import categoriesApi from "apis/categories";

const Menu = ({
  categories,
  refetch,
  articlesCount,
  articles,
  setArticles,
}) => {
  const [isSearchCollapsed, setIsSearchCollapsed] = useState(true);
  const [isAddCollapsed, setIsAddCollapsed] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [activeStatus, setActiveStatus] = useState("All");
  const [activeCategory, setActiveCategory] = useState(null);
  const selectedArticles = useMemo(() => articles, []);

  const MenuBarBlocks = [
    {
      label: "All",
      count: articlesCount.all,
      active: true,
    },
    {
      label: "Draft",
      count: articlesCount.draft,
      active: false,
    },
    {
      label: "Published",
      count: articlesCount.published,
      active: false,
    },
  ];

  const handleSubmit = async values => {
    try {
      setIsAddCollapsed(isAddCollapsed => !isAddCollapsed);
      if (values.name === "") return;
      await categoriesApi.create({ name: values.name });
      refetch();
    } catch (error) {
      logger.error(error);
    }
  };

  const handleActiveBlock = dataLabel => {
    if (dataLabel === "All") {
      setArticles(selectedArticles);
    } else {
      const filterSelectedArticles = selectedArticles.filter(
        article => article.status === dataLabel
      );
      setArticles(filterSelectedArticles);
    }
    setActiveStatus(dataLabel);
    setActiveCategory(null);
  };

  const handleActiveCategory = categoryId => {
    const filterSelectedCategory = selectedArticles.filter(
      article => article.category_id === categoryId
    );
    setArticles(filterSelectedCategory);
    setActiveCategory(categoryId);
    setActiveStatus("All");
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
              setIsAddCollapsed(true);
              setSearchValue("");
              setIsSearchCollapsed(isSearchCollapsed => !isSearchCollapsed);
            },
          },
          {
            icon: isAddCollapsed ? Plus : Close,
            onClick: () => {
              setIsSearchCollapsed(true);
              setSearchValue("");
              setIsAddCollapsed(isAddCollapsed => !isAddCollapsed);
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
        collapse={isSearchCollapsed}
        value={searchValue}
        onChange={e => setSearchValue(e.target.value)}
        onCollapse={() => {
          setIsSearchCollapsed(true);
          setSearchValue("");
        }}
      />
      {!isAddCollapsed && (
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
            active={category.id === activeCategory}
            count={category.count}
            key={category.id}
            label={category.name}
            onClick={() => handleActiveCategory(category.id)}
          />
        ))}
    </MenuBar>
  );
};

export default Menu;
