import Articles from "./Dashboard/Articles";
import Create from "./Dashboard/Articles/Article/Create";
import Edit from "./Dashboard/Articles/Article/Edit";

export const DASHBOARD_PATH = "/";
export const SETTINGS_PATH = "/settings/general";
export const ARTICLE_CREATE_PATH = "/article/crate";
export const ARTICLE_EDIT_PATH = "/article/:slug/edit";

export const DASHBOARD_ROUTES = [
  {
    path: DASHBOARD_PATH,
    component: Articles,
  },
  {
    path: ARTICLE_CREATE_PATH,
    component: Create,
  },
  {
    path: ARTICLE_EDIT_PATH,
    component: Edit,
  },
];
