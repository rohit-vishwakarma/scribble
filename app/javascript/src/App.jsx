import React, { useEffect, useState } from "react";

import "lib/dayjs"; // eslint-disable-line
import { PageLoader } from "neetoui";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { organizationsApi } from "apis/admin";
import { setAuthHeaders, registerIntercepts } from "apis/axios";
import { initializeLogger } from "common/logger";
import { PrivateRoute, Dashboard, Eui, SiteLogin } from "components/index";
import { convertSnakeCaseKeysToCamelCase } from "components/utils";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(true);

  const authToken = JSON.parse(localStorage.getItem("authToken"));

  useEffect(() => {
    initializeLogger();
    registerIntercepts();
    setAuthHeaders(setLoading);
    fetchOrganizationDetails();
  }, []);

  const fetchOrganizationDetails = async () => {
    try {
      setLoading(true);
      const { data } = await organizationsApi.fetch();
      const organization = convertSnakeCaseKeysToCamelCase(data);
      setIsAuthorized(
        authToken?.token === organization.authenticationToken ||
          !organization.isPasswordProtected
      );
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
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
