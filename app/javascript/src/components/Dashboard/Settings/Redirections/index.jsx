import React, { useEffect, useState } from "react";

import { PageLoader } from "@bigbinary/neetoui";
import { Plus } from "neetoicons";
import { Typography, Button } from "neetoui";

import redirectionsApi from "apis/redirections";

import Header from "./Header";
import Add from "./Redirection/Add";
import Edit from "./Redirection/Edit";
import Row from "./Row";

const Redirection = () => {
  const [showAdd, setShowAdd] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedRedirectionId, setSelectedRedirectionId] = useState(null);
  const [redirectionsList, setRedirectionsList] = useState([]);

  useEffect(() => {
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
    return (
      <div className="h-screen w-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <div className="mx-auto mt-8 w-6/12">
      <Typography className="h-10" style="h2">
        Redirections
      </Typography>
      <Typography className="text-gray-500" style="body1">
        Create and configure redirection rules to send users from old links to
        new links. All redirections are performed with 301 status codes to be
        SEO friendly.
      </Typography>
      <div className="mt-2 bg-indigo-100 p-6">
        <table className="mx-auto w-full">
          <Header />
          <tbody>
            {redirectionsList.map((redirection, idx) => (
              <tr
                className="my-3 flex items-center justify-between bg-white p-3"
                key={idx}
              >
                {selectedRedirectionId === redirection.id ? (
                  <td className="flex w-full justify-between">
                    <Edit
                      redirection={redirection}
                      refetch={fetchRedirectionsList}
                      setSelectedRedirectionId={setSelectedRedirectionId}
                    />
                  </td>
                ) : (
                  <Row
                    redirection={redirection}
                    refetch={fetchRedirectionsList}
                    setSelectedRedirectionId={setSelectedRedirectionId}
                  />
                )}
              </tr>
            ))}
            {showAdd ? (
              <tr className="my-3 flex items-center justify-between bg-white">
                <td className="flex w-full justify-between">
                  <Add
                    refetch={fetchRedirectionsList}
                    setShowAdd={setShowAdd}
                  />
                </td>
              </tr>
            ) : (
              <tr>
                <td>
                  <Button
                    icon={Plus}
                    iconPosition="left"
                    label="Add New Redirection"
                    style="link"
                    onClick={() => setShowAdd(prevState => !prevState)}
                  />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Redirection;
