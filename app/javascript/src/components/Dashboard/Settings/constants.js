import { Settings, Repeat, Seo } from "neetoicons";
import * as yup from "yup";

import General from "./General";
import Manage from "./ManageCategories";
import Redirection from "./Redirections";

export const SETTINGS_OPTIONS = [
  {
    label: "General",
    description: "Page Title, Brand Name & Meta Description",
    tab: "general",
    icon: Settings,
    component: General,
  },
  {
    label: "Redirections",
    description: "Create & configure redirection rules",
    tab: "redirections",
    icon: Repeat,
    component: Redirection,
  },
  {
    label: "Manage Categories",
    description: "Edit and Reorder KB Structure",
    tab: "managecategories",
    icon: Seo,
    component: Manage,
  },
];

export const GENERAL_SETTINGS_FORM_VALIDATION_SCHEMA = yup.object().shape({
  name: yup.string().required("SiteName cannot be empty."),
});
