import React from "react";

import { Route, Switch, useRouteMatch } from "react-router-dom";

import General from "./General";
import ManageCategories from "./ManageCategories";
import Redirection from "./Redirections";
import Sidebar from "./Sidebar";

const Settings = () => {
  const { path } = useRouteMatch();

  return (
    <div className="flex">
      <Sidebar />
      <Switch>
        <Route component={General} path={`${path}/general`} />
        <Route component={Redirection} path={`${path}/redirections`} />
        <Route component={ManageCategories} path={`${path}/managecategories`} />
      </Switch>
    </div>
  );
};

export default Settings;
