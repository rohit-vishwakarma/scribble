import { Settings, Repeat, Seo } from "neetoicons";

import General from "./General";
import Manage from "./Manage";
import Redirection from "./Redirection";

export const SETTINGS_OPTIONS = [
  {
    active: true,
    label: "General",
    description: "Page Title, Brand Name & Meta Description",
    icon: Settings,
    component: General,
  },
  {
    active: false,
    label: "Redirections",
    description: "Create & configure redirection rules",
    icon: Repeat,
    component: Redirection,
  },
  {
    active: false,
    label: "Manage Categories",
    description: "Edit and Reorder KB Structure",
    icon: Seo,
    component: Manage,
  },
];
