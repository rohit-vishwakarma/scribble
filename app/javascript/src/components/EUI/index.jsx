import React, { useState, useEffect } from "react";

import { PageLoader } from "neetoui";

import sitesApi from "apis/sites";

import Header from "./Header";

const EUI = () => {
  const [siteData, setSiteData] = useState({});
  const [loading, setLoading] = useState({});

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

  return <Header siteName={siteData.name} />;
};

export default EUI;
