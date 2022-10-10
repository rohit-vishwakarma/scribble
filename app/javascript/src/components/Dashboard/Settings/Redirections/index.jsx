import React, { useState } from "react";

import { Plus } from "neetoicons";
import { Typography, Button } from "neetoui";

import Add from "./Add";
import { REDIRECTIONS_LIST } from "./constants";
import Header from "./Header";
import Row from "./Row";

const Redirection = () => {
  const [showAdd, setShowAdd] = useState(false);

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
      <div className="mt-8 bg-indigo-100 py-4">
        <table className="mx-auto w-11/12 ">
          <Header />
          <tbody>
            {REDIRECTIONS_LIST.map((row, idx) => (
              <tr
                className="my-3 flex items-center justify-between bg-white p-4"
                key={idx}
              >
                <Row from={row.from} isEdit={row.isEdit} to={row.to} />
              </tr>
            ))}
            {showAdd && (
              <tr className="my-3 flex items-center justify-between bg-white p-4">
                <Add setShowAdd={setShowAdd} />
              </tr>
            )}
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
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Redirection;
