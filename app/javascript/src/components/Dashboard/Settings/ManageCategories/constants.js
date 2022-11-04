import * as yup from "yup";

export const ADD_CATEGORY_FORM_VALIDATION_SCHEMA = yup.object().shape({
  name: yup
    .string()
    .matches(/\w*[aA-zZ]\w*/, "Must contain at least one letter.")
    .required("Name is required. Please enter the name."),
});

export const EDIT_CATEGORY_FORM_VALIDATION_SCHEMA = yup.object().shape({
  name: yup
    .string()
    .matches(/\w*[aA-zZ]\w*/, "Must contain at least one letter.")
    .required("Category name cannot be empty."),
});
