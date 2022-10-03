import React from "react";

import { ExternalLink } from "neetoicons";
import { Button, Typography } from "neetoui";
import { Header } from "neetoui/layouts";

import { DASHBOARD_PATH } from "../routeConstants";

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
          <div className="flex gap-6 text-base">
            <Button
              style="link"
              to={DASHBOARD_PATH}
              label={
                <Typography className="text-base text-indigo-700">
                  Articles
                </Typography>
              }
            />
            <Button
              style="link"
              to="/"
              label={
                <Typography className="text-base text-gray-400">
                  Settings
                </Typography>
              }
            />
          </div>
        </div>
      }
    />
    <hr />
  </>
);

export default NavBar;
