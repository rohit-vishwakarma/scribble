import React, { useEffect, useState } from "react";

import "lib/dayjs"; // eslint-disable-line
import { ToastContainer } from "react-toastify";

import { setAuthHeaders } from "apis/axios";
import { initializeLogger } from "common/logger";

import Dashboard from "./components/Dashboard";

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
    <>
      <ToastContainer />
      <Dashboard />
    </>
  );
};

export default App;
