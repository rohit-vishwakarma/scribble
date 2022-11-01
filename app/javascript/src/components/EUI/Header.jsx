import React, { useState, useEffect } from "react";

import { Typography, PageLoader } from "neetoui";

import organizationsApi from "apis/organizations";

const Header = ({ isEUI, setShowSearchBar }) => {
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
    <div className="flex h-12 w-full border-b-2">
      {isEUI && (
        <div className="mt-2 ml-8 h-10 w-3/12">
          <div
            className="border cursor-pointer rounded-sm border-gray-500"
            onClick={() => setShowSearchBar(true)}
          >
            <Typography className="m-1 text-gray-400">
              Search for articles here.
            </Typography>
          </div>
        </div>
      )}
      <div className="w-full">
        <Typography className="flex justify-center py-3" style="h4">
          {organizationData.name}
        </Typography>
      </div>
    </div>
  );
};

export default Header;
