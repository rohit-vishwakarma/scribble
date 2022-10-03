import React from "react";

import { ExternalLink } from "neetoicons";
import { Button, Typography } from "neetoui";
import { Header } from "neetoui/layouts";
import { NavLink } from "react-router-dom";

const NavBar = () => (
  <>
    <Header
      actionBlock={
        <div className="pr-6">
          <Button icon={ExternalLink} label="Preview" style="secondary" />
        </div>
      }
      title={
        <div className="flex h-6 w-16 gap-6">
          <Typography className="pl-6 text-gray-800" style="h4">
            Scribble
          </Typography>
          <NavLink className="text-base text-indigo-700" to="/">
            Articles
          </NavLink>
          <NavLink className="text-base text-gray-400" to="/">
            Settings
          </NavLink>
        </div>
      }
    />
    <hr />
  </>
);

export default NavBar;
