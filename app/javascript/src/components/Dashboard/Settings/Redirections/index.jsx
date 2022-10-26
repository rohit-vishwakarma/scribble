import React, { useEffect, useState } from "react";

import { Plus } from "neetoicons";
import { Typography, Button, PageLoader } from "neetoui";

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
      <div className="mx-auto mt-2 w-full bg-indigo-100 p-6">
        <Header />
        {redirectionsList.map((redirection, idx) => (
          <div
            className="my-3 flex items-center justify-between bg-white p-3"
            key={idx}
          >
            {selectedRedirectionId === redirection.id ? (
              <div className="flex w-full justify-between">
                <Edit
                  redirection={redirection}
                  redirectionsList={redirectionsList}
                  refetch={fetchRedirectionsList}
                  setSelectedRedirectionId={setSelectedRedirectionId}
                />
              </div>
            ) : (
              <Row
                redirection={redirection}
                refetch={fetchRedirectionsList}
                setSelectedRedirectionId={setSelectedRedirectionId}
                setShowAdd={setShowAdd}
              />
            )}
          </div>
        ))}
        {showAdd ? (
          <div className="my-3 flex w-full items-center justify-between bg-white">
            <Add
              redirectionsList={redirectionsList}
              refetch={fetchRedirectionsList}
              setShowAdd={setShowAdd}
            />
          </div>
        ) : (
          <Button
            icon={Plus}
            iconPosition="left"
            label="Add new redirection"
            style="link"
            onClick={() => {
              setShowAdd(prevState => !prevState);
              setSelectedRedirectionId(null);
            }}
          />
        )}
      </div>
    </div>
  );
};
export default Redirection;
