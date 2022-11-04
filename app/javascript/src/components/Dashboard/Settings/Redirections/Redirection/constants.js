import * as yup from "yup";

export const REDIRECTION_FORM_VALIDATION_SCHEMA = yup.object().shape({
  from: yup
    .string()
    .matches(/^\//, "From Should start with '/'")
    .notOneOf([yup.ref("to"), null], "From & To path can't be same.")
    .matches(/\w*[aA-zZ0-9]\w*/, "Must contain at least one letter or number.")
    .required("From Path is required"),
  to: yup
    .string()
    .matches(/^\//, "To Should start with '/'")
    .matches(/\w*[aA-zZ0-9]\w*/, "Must contain at least one letter or number.")
    .required("To Path is required"),
});
