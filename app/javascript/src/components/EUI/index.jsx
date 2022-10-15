import React, { useState, useEffect } from "react";

import { PageLoader } from "neetoui";

import sitesApi from "apis/sites";

import Header from "./Header";
import Login from "./Login";

const EUI = () => {
  const [siteData, setSiteData] = useState({});
  const [loading, setLoading] = useState({});
  const [showLoginPage, setShowLoginPage] = useState(true);

  useEffect(() => {
    fetchSiteDetails();
  }, []);

  const fetchSiteDetails = async () => {
    try {
      setLoading(true);
      const {
        data: { site },
      } = await sitesApi.fetch();
      setSiteData(site);
      setShowLoginPage(site.password !== null);
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
    <>
      <Header siteName={siteData.name} />
      {showLoginPage && (
        <Login setShowLoginPage={setShowLoginPage} siteData={siteData} />
      )}
    </>
  );
};

export default EUI;
