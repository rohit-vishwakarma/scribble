import * as yup from "yup";

export const REDIRECTION_FORM_VALIDATION_SCHEMA = redirectionsList =>
  yup.object().shape({
    from: yup
      .string()
      .notOneOf([yup.ref("to"), null], "To and From should not be equal")
      .matches(/^\/[a-zA-Z0-9/?&=]+$/i, "From must be in the format of '/path'")
      .required("From Path is required"),
    to: yup
      .string()
      .notOneOf(
        redirectionsList.map(item => item.from),
        "From Path already exists"
      )
      .matches(/^\/[a-zA-Z0-9/?&=]+$/i, "To must be in the format of '/path'")
      .required("To Path is required"),
  });
