import React, { useState } from "react";

import { Button } from "neetoui";
import { MenuBar } from "neetoui/layouts";
import { Route } from "react-router-dom";

import { SETTINGS_OPTIONS } from "./constants";

const Settings = () => {
  const [activeSetting, setActiveSetting] = useState("General");

  return (
    <div className="flex">
      <MenuBar showMenu>
        {SETTINGS_OPTIONS.map((settingsOption, idx) => (
          <div className="flex" key={idx}>
            <div className="w-96 flex">
              <Button icon={settingsOption.icon} style="text" />
              <MenuBar.Item
                active={settingsOption.label === activeSetting}
                description={settingsOption.description}
                label={settingsOption.label}
                onClick={() => setActiveSetting(settingsOption.label)}
              />
            </div>
          </div>
        ))}
      </MenuBar>
      {SETTINGS_OPTIONS.map(
        settingsOption =>
          settingsOption.label === activeSetting && (
            <Route
              component={settingsOption.component}
              key={settingsOption.label}
            />
          )
      )}
    </div>
  );
};

export default Settings;
