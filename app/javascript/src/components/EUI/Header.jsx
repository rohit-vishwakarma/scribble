import React, { useState, useEffect } from "react";

import { Typography, PageLoader } from "neetoui";

import organizationsApi from "apis/organizations";

const Header = () => {
  const [organizationData, setOrganizationData] = useState({});
  const [loading, setLoading] = useState({});

  useEffect(() => {
    fetchOrganizationDetails();
  }, []);

  const fetchOrganizationDetails = async () => {
    try {
      setLoading(true);
      const {
        data: { organization },
      } = await organizationsApi.fetch();
      setOrganizationData(organization);
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
      <Typography style="h4">{organizationData.name}</Typography>
    </div>
  );
};

export default Header;
