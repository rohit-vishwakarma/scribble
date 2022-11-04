import React, { useState, useEffect } from "react";

import { Formik, Form } from "formik";
import { Plus, Search, Close, Check } from "neetoicons";
import { Typography, Button } from "neetoui";
import { Input as FormikInput } from "neetoui/formik";
import { MenuBar } from "neetoui/layouts";
import * as yup from "yup";

import { categoriesApi } from "apis/admin";
import Tooltip from "components/Common/Tooltip";

import {
  filterArticlesAccordingToCategories,
  countArticlesAccordingToStatus,
} from "./utils";

const Menu = ({
  categories,
  refetch,
  articles,
  filterOptions,
  setFilterOptions,
}) => {
  const [isCollapsed, setIsCollapsed] = useState({ add: true, search: true });
  const [searchValue, setSearchValue] = useState("");
  const [articlesStatusCount, setArticlesStatusCount] = useState({
    all: 0,
    draft: 0,
    published: 0,
  });

  const MenuBarBlocks = [
    {
      label: "All",
      count: articlesStatusCount.all,
      active: true,
    },
    {
      label: "Draft",
      count: articlesStatusCount.draft,
      active: false,
    },
    {
      label: "Published",
      count: articlesStatusCount.published,
      active: false,
    },
  ];

  useEffect(() => {
    if (
      filterOptions.activeStatus === "All" &&
      filterOptions.searchTerm === ""
    ) {
      countArticlesAccordingToStatus(articles, setArticlesStatusCount);
    }
  }, [articles]);

  const handleSubmit = async values => {
    try {
      setIsCollapsed({ ...isCollapsed, add: !isCollapsed.add });
      await categoriesApi.create({ name: values.name });
      refetch();
    } catch (error) {
      logger.error(error);
    }
  };

  const handleActiveCategories = category => {
    filterArticlesAccordingToCategories(
      filterOptions,
      setFilterOptions,
      category
    );
  };

  return (
    <MenuBar showMenu title="Articles">
      {MenuBarBlocks.map(menuBarBlock => (
        <MenuBar.Block
          active={menuBarBlock.label === filterOptions.activeStatus}
          count={menuBarBlock.count}
          key={menuBarBlock.label}
          label={menuBarBlock.label}
          onClick={() =>
            setFilterOptions({
              ...filterOptions,
              activeStatus: menuBarBlock.label,
            })
          }
        />
      ))}
      <MenuBar.SubTitle
        iconProps={[
          {
            icon: Search,
            onClick: () => {
              setIsCollapsed({ add: true, search: !isCollapsed.search });
              setSearchValue("");
            },
          },
          {
            icon: isCollapsed.add ? Plus : Close,
            onClick: () => {
              setIsCollapsed({ search: true, add: !isCollapsed.add });
              setSearchValue("");
            },
          },
        ]}
      >
        <Typography
          component="h4"
          style="h5"
          textTransform="uppercase"
          weight="bold"
        >
          CATEGORIES
        </Typography>
      </MenuBar.SubTitle>
      <MenuBar.Search
        collapse={isCollapsed.search}
        value={searchValue}
        onChange={e => setSearchValue(e.target.value)}
        onCollapse={() => {
          setIsCollapsed({ ...isCollapsed, search: true });
          setSearchValue("");
        }}
      />
      {!isCollapsed.add && (
        <div>
          <Formik
            initialValues={{ name: "" }}
            validationSchema={yup.object().shape({
              name: yup
                .string()
                .matches(/\w*[aA-zZ]\w*/, "Must contain at least one letter.")
                .required("Name is required. Please enter the name."),
            })}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, dirty }) => (
              <Form>
                <FormikInput
                  className="mb-5"
                  name="name"
                  suffix={
                    <Tooltip
                      content="Enter category name to add."
                      disabled={isSubmitting || !dirty}
                      followCursor="horizontal"
                      position="bottom"
                    >
                      <Button
                        disabled={isSubmitting || !dirty}
                        icon={Check}
                        style="text"
                        type="submit"
                      />
                    </Tooltip>
                  }
                />
              </Form>
            )}
          </Formik>
        </div>
      )}
      {categories
        .filter(category =>
          category.name
            .toLowerCase()
            .replaceAll(" ", "")
            .includes(searchValue.toLowerCase().replaceAll(" ", ""))
        )
        .map(category => (
          <MenuBar.Block
            active={filterOptions.categoryIds.includes(category.id)}
            count={category.count}
            key={category.id}
            label={category.name}
            onClick={() => handleActiveCategories(category)}
          />
        ))}
    </MenuBar>
  );
};

export default Menu;
