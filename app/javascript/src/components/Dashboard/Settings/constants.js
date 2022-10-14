import { Settings, Repeat, Seo } from "neetoicons";
import * as yup from "yup";

import General from "./General";
import Manage from "./ManageCategories";
import Redirection from "./Redirections";

export const SETTINGS_OPTIONS = [
  {
    label: "General",
    description: "Page Title, Brand Name & Meta Description",
    to: "/general",
    icon: Settings,
    component: General,
  },
  {
    label: "Redirections",
    description: "Create & configure redirection rules",
    to: "/redirections",
    icon: Repeat,
    component: Redirection,
  },
  {
    label: "Manage Categories",
    description: "Edit and Reorder KB Structure",
    to: "/managecategories",
    icon: Seo,
    component: Manage,
  },
];

export const GENERAL_SETTINGS_FORM_VALIDATION_SCHEMA = yup.object().shape({
  sitename: yup.string().required("SiteName cannot be empty."),
});
