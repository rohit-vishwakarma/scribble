import React, { useEffect, useState } from "react";

import { Plus } from "neetoicons";
import { Typography, PageLoader, Button } from "neetoui";

import { categoriesApi } from "apis/admin";

import List from "./List";
import NewCategoryPane from "./Pane/Create";

const Manage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddPane, setShowAddPane] = useState(false);

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
    return (
      <div className="h-screen w-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <div className="mx-auto h-screen w-1/4 overflow-y-auto">
      <div className="fixed top-0 z-40 flex w-1/4 justify-between bg-white pt-24">
        <Typography className="h-10" style="h2">
          Manage Categories
        </Typography>
        <div className="my-auto">
          <Button icon={Plus} size={15} onClick={() => setShowAddPane(true)} />
        </div>
      </div>
      <NewCategoryPane
        refetch={fetchCategories}
        setShowPane={setShowAddPane}
        showPane={showAddPane}
      />
      <div className="mt-32 mb-4">
        <List
          categories={categories}
          refetch={fetchCategories}
          setCategories={setCategories}
        />
      </div>
    </div>
  );
};
export default Manage;
