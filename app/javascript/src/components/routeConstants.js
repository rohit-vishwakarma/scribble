import Articles from "./Dashboard/Articles";

export const DASHBOARD_PATH = "/";
export const SETTINGS_PATH = "/settings/general";

export const DASHBOARD_ROUTES = [
  {
    path: DASHBOARD_PATH,
    component: Articles,
  },
];
