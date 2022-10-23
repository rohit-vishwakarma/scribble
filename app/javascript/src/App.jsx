import React, { useEffect, useState } from "react";

import "lib/dayjs"; // eslint-disable-line
import { PageLoader } from "neetoui";
import {
  Switch,
  Route,
  Redirect,
  BrowserRouter as Router,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";

import {
  setAuthHeaders,
  registerIntercepts,
  redirectionsApi,
  sitesApi,
} from "apis/index";
import { initializeLogger } from "common/logger";
import { PrivateRoute, Dashboard, Eui, SiteLogin } from "components/index";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [redirectionsList, setRedirectionsList] = useState([]);
  const [isAuthorized, setIsAuthorized] = useState(true);
  const authToken = JSON.parse(localStorage.getItem("authToken"));

  const fetchSiteDetailsAndRedirectionsList = async () => {
    await Promise.all([fetchRedirectionsList(), fetchSiteDetails()]);
    setLoading(false);
  };

  useEffect(() => {
    initializeLogger();
    registerIntercepts();
    setAuthHeaders(setLoading);
    fetchSiteDetailsAndRedirectionsList();
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
    }
  };

  const fetchSiteDetails = async () => {
    try {
      setLoading(true);
      const {
        data: { site },
      } = await sitesApi.fetch();
      setIsAuthorized(
        (authToken && authToken.token !== null) || site.password_digest === null
      );
    } catch (error) {
      logger.error(error);
    }
  };

  if (loading) {
    return (
      <div className="h-screen w-screen">
        <PageLoader />
      </div>
    );
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
        <PrivateRoute
          component={() => <SiteLogin setIsAuthorized={setIsAuthorized} />}
          condition={!isAuthorized}
          path="/public/login"
          redirectRoute="/public"
        />
        <PrivateRoute
          component={() => <Eui />}
          condition={isAuthorized}
          path="/public"
          redirectRoute="/public/login"
        />
        <Route component={Dashboard} path="/" />
      </Switch>
    </Router>
  );
};

export default App;
