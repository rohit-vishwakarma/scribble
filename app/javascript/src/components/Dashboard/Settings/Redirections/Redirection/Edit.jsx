import React from "react";

import Form from "./Form";

const Edit = ({
  redirection,
  redirectionsList,
  setSelectedRedirectionId,
  refetch,
}) => (
  <Form
    isEdit
    initialValues={redirection}
    redirectionsList={redirectionsList}
    refetch={refetch}
    setShowRedirection={setSelectedRedirectionId}
  />
);

export default Edit;
