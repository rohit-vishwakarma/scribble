import React, { useEffect, useState } from "react";

import { Typography, PageLoader } from "neetoui";

import categoriesApi from "apis/categories";

import Add from "./Add";
import List from "./List";

const Manage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const fetchedCategories = await categoriesApi.fetch();
      setCategories(fetchedCategories.data);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div className="mx-auto mt-8 w-5/12">
      <Typography className="h-10" style="h2">
        Manage Categories
      </Typography>
      <Typography className="text-gray-500" style="body1">
        Create and configure the categories inside your scribble.
      </Typography>
      <div className="mt-8">
        <Add refetch={fetchCategories} />
      </div>
      <List
        categories={categories}
        refetch={fetchCategories}
        setCategories={setCategories}
      />
    </div>
  );
};
export default Manage;
