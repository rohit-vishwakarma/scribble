import React, { useState } from "react";

import { Plus, Search, Close, Check } from "neetoicons";
import { Typography, Input } from "neetoui";
import { MenuBar } from "neetoui/layouts";

import { MenuBarBlocks } from "./constants";

const Menu = () => {
  const [isSearchCollapsed, setIsSearchCollapsed] = useState(true);
  const [isAddCollapsed, setIsAddCollapsed] = useState(true);
  const [value, setValue] = useState("");

  return (
    <MenuBar showMenu title="Articles">
      {MenuBarBlocks.main.map(menuBarBlock => (
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
              setIsSearchCollapsed(isSearchCollapsed => !isSearchCollapsed);
              setIsAddCollapsed(true);
            },
          },
          {
            icon: isAddCollapsed ? Plus : Close,
            onClick: () => {
              setIsAddCollapsed(isAddCollapsed => !isAddCollapsed);
              setIsSearchCollapsed(true);
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
        onCollapse={() => setIsSearchCollapsed(true)}
      />
      {!isAddCollapsed && (
        <Input
          value={value}
          suffix={
            <Check
              onClick={() => {
                setIsAddCollapsed(isAddCollapsed => !isAddCollapsed);
              }}
            />
          }
          onChange={e => setValue(e.target.value)}
        />
      )}
      {MenuBarBlocks.categories.map(menuBarBlock => (
        <MenuBar.Block
          count={menuBarBlock.count}
          key={menuBarBlock.label}
          label={menuBarBlock.label}
        />
      ))}
    </MenuBar>
  );
};

export default Menu;
