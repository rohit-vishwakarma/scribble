import React from "react";

import { Typography } from "neetoui";

const Header = () => {
  const columnsTitle = ["FROM PATH", "TO PATH", "ACTIONS"];

  return (
    <thead>
      <tr className="flex items-center justify-between">
        {columnsTitle.map((title, index) => (
          <th key={index}>
            <Typography className="py-3 text-gray-500" style="h6">
              {title}
            </Typography>
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default Header;
