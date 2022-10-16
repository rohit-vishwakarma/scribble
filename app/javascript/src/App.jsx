import React, { useEffect, useState } from "react";

import "lib/dayjs"; // eslint-disable-line
import {
  Switch,
  Route,
  Redirect,
  BrowserRouter as Router,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { setAuthHeaders } from "apis/axios";
import redirectionsApi from "apis/redirections";
import { initializeLogger } from "common/logger";

import Dashboard from "./components/Dashboard";
import EUI from "./components/EUI";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [redirectionsList, setRedirectionsList] = useState([]);

  useEffect(() => {
    initializeLogger();
    setAuthHeaders(setLoading);
    fetchRedirectionsList();
  }, []);

  const fetchRedirectionsList = async () => {
    try {
      setLoading(true);
      const {
        data: { redirections },
      } = await redirectionsApi.fetch();
      setRedirectionsList(redirections);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <Router>
      <ToastContainer />
      <Switch>
        {redirectionsList.map(redirection => (
          <Route exact from={redirection.from} key={redirection.id}>
            <Redirect
              to={{ pathname: redirection.to, state: { status: 301 } }}
            />
          </Route>
        ))}
        <Route component={EUI} path="/public" />
        <Route component={Dashboard} path="/" />
      </Switch>
    </Router>
  );
};

export default App;
