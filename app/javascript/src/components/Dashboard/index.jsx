import React from "react";

import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

import { DASHBOARD_ROUTES } from "components/routeConstants";

import NavBar from "../Common/NavBar";

export const Dashboard = () => (
  <Router>
    <NavBar />
    <Switch>
      {DASHBOARD_ROUTES.map(({ path, component }) => (
        <Route exact component={component} key={path} path={path} />
      ))}
    </Switch>
  </Router>
);

export default Dashboard;
