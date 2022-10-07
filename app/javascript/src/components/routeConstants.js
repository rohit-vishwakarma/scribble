import Articles from "./Dashboard/Articles";
import Settings from "./Dashboard/Settings";

export const DASHBOARD_PATH = "/";
export const SETTINGS_PATH = "/settings";

export const DASHBOARD_ROUTES = [
  {
    path: DASHBOARD_PATH,
    component: Articles,
  },
  {
    path: SETTINGS_PATH,
    component: Settings,
  },
];
