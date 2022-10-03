import * as yup from "yup";

export const SELECTED_CATEGORY = [
  { label: "Getting Started", value: "gettingStarted" },
  { label: "Apps & Integration", value: "appsIntegration" },
  { label: "Security & Privacy", value: "securityPrivacy" },
  { label: "Misc", value: "misc" },
];

export const ARTICLES_FORM_INITIAL_VALUES = {
  title: "",
  description: "",
  category_id: null,
};

export const ARTICLES_FORM_VALIDATION_SCHEMA = yup.object().shape({
  title: yup.string().required("Title is required. Please Enter the Title"),
  description: yup
    .string()
    .required("Description is required. Please Enter the Description"),
  category_id: yup
    .object()
    .nullable()
    .shape({
      label: yup
        .string()
        .oneOf(SELECTED_CATEGORY.map(category => category.label)),
      value: yup
        .string()
        .oneOf(SELECTED_CATEGORY.map(category => category.value)),
    })
    .required("Category is required."),
});

export const MenuBarBlocks = [
  {
    label: "All",
    count: 67,
    active: true,
  },
  {
    label: "Draft",
    count: 15,
    active: false,
  },
  {
    label: "Published",
    count: 52,
    active: false,
  },
];

export const ColumnsListItems = [
  {
    name: "Title",
    dataIndex: "title",
    checked: true,
    value: 0,
  },
  {
    name: "Date",
    dataIndex: "created_at",
    checked: true,
    value: 1,
  },
  {
    name: "Author",
    dataIndex: "author",
    checked: true,
    value: 2,
  },
  {
    name: "Category",
    dataIndex: "category",
    checked: true,
    value: 3,
  },
  {
    name: "Status",
    dataIndex: "status",
    checked: true,
    value: 4,
  },
];
