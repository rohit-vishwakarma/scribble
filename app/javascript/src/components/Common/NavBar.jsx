import React from "react";

import { ExternalLink } from "neetoicons";
import { Button, Typography } from "neetoui";
import { NavLink } from "react-router-dom";

const NavBar = () => (
  <nav className="flex h-16 w-full items-center justify-between border-b-2 bg-white px-6">
    <div className="flex">
      <Typography style="h4">Scribble</Typography>
      <NavLink
        exact
        activeClassName="neeto-ui-text-primary-500 mx-6"
        className="neeto-ui-text-gray-500 mx-6"
        to="/"
      >
        <Typography style="h4">Articles</Typography>
      </NavLink>
      <NavLink
        activeClassName="neeto-ui-text-primary-500"
        className="neeto-ui-text-gray-500"
        to="/settings?tab=general"
      >
        <Typography style="h4">Settings</Typography>
      </NavLink>
      <NavLink
        activeClassName="neeto-ui-text-primary-500"
        className="neeto-ui-text-gray-500 ml-6"
        to="/analytics"
      >
        <Typography style="h4">Analytics</Typography>
      </NavLink>
    </div>
    <Button
      icon={ExternalLink}
      label="Preview"
      style="secondary"
      target="_blank"
      to="/public"
    />
  </nav>
);

export default NavBar;
