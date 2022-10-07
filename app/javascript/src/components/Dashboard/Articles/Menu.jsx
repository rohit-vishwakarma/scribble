import React, { useState, useEffect, useMemo } from "react";

import { Plus, Search, Close, Check } from "neetoicons";
import { Typography, Input } from "neetoui";
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
  const [addValue, setAddValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [categoriesList, setCategoriesList] = useState([]);
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

  useEffect(() => {
    if (searchValue === "") {
      setCategoriesList(categories);

      return;
    }
    const searchedCategoriesList = categories.filter(category =>
      category.name
        .toLowerCase()
        .replaceAll(" ", "")
        .includes(searchValue.toLowerCase().replaceAll(" ", ""))
    );
    setCategoriesList(searchedCategoriesList);
  }, [searchValue]);

  const handleClick = async () => {
    try {
      setIsAddCollapsed(isAddCollapsed => !isAddCollapsed);
      if (addValue === "") return;
      await categoriesApi.create({ name: addValue });
      setAddValue("");
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
              setAddValue("");
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
        onCollapse={() => setIsSearchCollapsed(true)}
      />
      {!isAddCollapsed && (
        <Input
          suffix={<Check className="cursor-pointer" onClick={handleClick} />}
          value={addValue}
          onChange={e => setAddValue(e.target.value)}
        />
      )}
      {categoriesList.map(category => (
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
