import React, { useEffect, useState } from "react";

import "lib/dayjs"; // eslint-disable-line
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { setAuthHeaders } from "apis/axios";
import { initializeLogger } from "common/logger";

import Dashboard from "./components/Dashboard";
import EUI from "./components/EUI";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeLogger();
    setAuthHeaders(setLoading);
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <Router>
      <ToastContainer />
      <Switch>
        <Route component={EUI} path="/public" />
        <Route component={Dashboard} path="/" />
      </Switch>
    </Router>
  );
};

export default App;
