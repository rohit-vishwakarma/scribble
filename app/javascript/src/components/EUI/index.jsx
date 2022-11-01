import React, { useState } from "react";

import Header from "./Header";
import Sidebar from "./Sidebar";

const EUI = () => {
  const [showSearchBar, setShowSearchBar] = useState(false);

  return (
    <>
      <Header isEUI setShowSearchBar={setShowSearchBar} />
      <Sidebar
        setShowSearchBar={setShowSearchBar}
        showSearchBar={showSearchBar}
      />
    </>
  );
};

export default EUI;
