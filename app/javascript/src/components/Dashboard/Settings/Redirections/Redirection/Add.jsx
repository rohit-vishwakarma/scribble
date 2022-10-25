import React from "react";

import Form from "./Form";

const Add = ({ setShowAdd, redirectionsList, refetch }) => (
  <Form
    initialValues={{ from: "/", to: "/" }}
    isEdit={false}
    redirectionsList={redirectionsList}
    refetch={refetch}
    setShowRedirection={setShowAdd}
  />
);

export default Add;
