import React from "react";

import { Plus } from "neetoicons";
import { Typography, Button } from "neetoui";

const Redirection = () => {
  const columnsTitle = ["FROM PATH", "TO PATH", "ACTIONS"];

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
          <thead>
            <tr className="w-full text-left">
              {columnsTitle.map((title, index) => (
                <th key={index}>
                  <Typography className="py-3 text-gray-400" style="h6">
                    {title}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <Button
                  icon={Plus}
                  iconPosition="left"
                  label="Add New Redirection"
                  style="link"
                  onClick={() => {}}
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
