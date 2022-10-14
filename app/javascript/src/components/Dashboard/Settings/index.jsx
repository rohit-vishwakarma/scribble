import React from "react";

import { Route, Switch, useRouteMatch, Redirect } from "react-router-dom";

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
        <Redirect from="/settings" to="/settings/general" />
      </Switch>
    </div>
  );
};

export default Settings;
