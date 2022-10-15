import React from "react";

import { Typography } from "neetoui";

const Header = ({ siteName }) => (
  <div className="flex h-12 w-full justify-center border-b-2 py-3">
    <Typography style="h4">{siteName}</Typography>
  </div>
);

export default Header;
