import React, { useEffect, useState } from "react";

import { Search } from "neetoicons";
import { Modal, Typography, Select, PageLoader } from "neetoui";

import articlesApi from "apis/articles";

const SearchBar = ({ showSearchBar, setPreviewPath, setShowSearchBar }) => {
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const {
        data: { published_articles: articles },
      } = await articlesApi.fetch();
      setArticles(
        articles.map(article => ({
          label: article.title,
          value: article.slug,
        }))
      );
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <Modal
      closeButton={false}
      isOpen={showSearchBar}
      size="large"
      onClose={() => setShowSearchBar(false)}
    >
      {loading ? (
        <PageLoader />
      ) : (
        <Select
          defaultMenuIsOpen
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
      )}
    </Modal>
  );
};

export default SearchBar;
