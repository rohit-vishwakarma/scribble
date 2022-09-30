import React, { useState, useEffect } from "react";

import { Plus, Search, Close, Check } from "neetoicons";
import { Typography, Input } from "neetoui";
import { MenuBar } from "neetoui/layouts";

import { MenuBarBlocks } from "./constants";

const Menu = ({ categories }) => {
  const [isSearchCollapsed, setIsSearchCollapsed] = useState(true);
  const [isAddCollapsed, setIsAddCollapsed] = useState(true);
  const [addValue, setAddValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [categoriesList, setCategoriesList] = useState([]);

  useEffect(() => {
    if (searchValue === "") {
      setCategoriesList(categories);

      return;
    }
    const searchedCategoriesList = categories.filter(category =>
      category.name.toLowerCase().includes(searchValue)
    );
    setCategoriesList(searchedCategoriesList);
  }, [searchValue]);

  return (
    <MenuBar showMenu title="Articles">
      {MenuBarBlocks.map(menuBarBlock => (
        <MenuBar.Block
          active={menuBarBlock.active}
          count={menuBarBlock.count}
          key={menuBarBlock.label}
          label={menuBarBlock.label}
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
          value={addValue}
          suffix={
            <Check
              className="cursor-pointer"
              onClick={() => {
                setIsAddCollapsed(isAddCollapsed => !isAddCollapsed);
                setAddValue("");
              }}
            />
          }
          onChange={e => setAddValue(e.target.value)}
        />
      )}
      {categoriesList.map(category => (
        <MenuBar.Block count={10} key={category.id} label={category.name} />
      ))}
    </MenuBar>
  );
};

export default Menu;
