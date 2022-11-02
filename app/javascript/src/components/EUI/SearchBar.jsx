import React from "react";

import { Search } from "neetoicons";
import { Modal, Typography, Select } from "neetoui";

const SearchBar = ({
  articles,
  showSearchBar,
  setPreviewPath,
  setShowSearchBar,
}) => (
  <Modal
    closeButton={false}
    isOpen={showSearchBar}
    size="large"
    onClose={() => setShowSearchBar(false)}
  >
    <Select
      isClearable
      isSearchable
      options={articles}
      placeholder={
        <Typography className="flex">
          <Search />
          Search for an article.
        </Typography>
      }
      onChange={article => {
        setPreviewPath(article.value);
        setShowSearchBar(false);
      }}
    />
  </Modal>
);
export default SearchBar;
