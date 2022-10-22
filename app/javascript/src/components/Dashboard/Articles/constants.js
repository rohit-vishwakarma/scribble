import * as yup from "yup";

export const ARTICLES_FORM_INITIAL_VALUES = {
  title: "",
  body: "",
  category: null,
  status: "Draft",
};

export const ARTICLES_FORM_VALIDATION_SCHEMA = CATEGORY_OPTIONS =>
  yup.object().shape({
    title: yup
      .string()
      .matches(
        /\w*[aA-zZ0-9]\w*/,
        "Must contain at least one letter or number."
      )
      .required("Title is required. Please Enter the Title."),
    body: yup
      .string()
      .required("Body is required. Please Enter the Body of the Article."),
    category: yup
      .object()
      .nullable()
      .shape({
        label: yup
          .string()
          .oneOf(CATEGORY_OPTIONS.map(category => category.label)),
        value: yup
          .number()
          .oneOf(CATEGORY_OPTIONS.map(category => category.value)),
      })
      .required("Category is required."),
  });

export const ColumnsListItems = [
  {
    name: "Title",
    dataIndex: "title",
    checked: true,
    value: 0,
  },
  {
    name: "Date",
    dataIndex: "updated_at",
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
