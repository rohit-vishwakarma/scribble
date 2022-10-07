import React, { useEffect, useState } from "react";

import { Plus, AddCircle, Delete, Edit } from "neetoicons";
import { Typography, Button, PageLoader } from "neetoui";

import categoriesApi from "apis/categories";

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
    <div className="mx-auto mt-8 w-6/12">
      <Typography className="h-10" style="h2">
        Manage Categories
      </Typography>
      <Typography className="text-gray-500" style="body1">
        Create and configure the categories inside your scribble.
      </Typography>
      <div className="mt-8">
        <Button
          icon={Plus}
          iconPosition="left"
          label="Add New Redirection"
          style="link"
          onClick={() => {}}
        />
      </div>
      {categories.map((category, idx) => (
        <div key={idx}>
          <hr />
          <div className="flex h-12 justify-between">
            <div className="flex">
              <AddCircle className="my-auto" size={13} />
              <Typography className="my-auto ml-2 text-gray-700" style="h4">
                {category.name}
              </Typography>
            </div>
            <div className="my-auto flex items-end gap-x-3">
              <Delete size={13} onClick={() => {}} />
              <Edit size={13} onClick={() => {}} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Manage;
