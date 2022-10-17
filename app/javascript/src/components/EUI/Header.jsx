import React, { useState, useEffect } from "react";

import { Typography, PageLoader } from "neetoui";

import sitesApi from "apis/sites";

const Header = () => {
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

  return (
    <div className="flex h-12 w-full justify-center border-b-2 py-3">
      <Typography style="h4">{siteData.name}</Typography>
    </div>
  );
};

export default Header;
