import Articles from "./Dashboard/Articles";
import ArticleForm from "./Dashboard/Articles/Form";

export const DASHBOARD_PATH = "/";
export const ARTICLE_FORM_PATH = "/articles/form";

export const DASHBOARD_ROUTES = [
  {
    path: DASHBOARD_PATH,
    component: Articles,
  },
  {
    path: ARTICLE_FORM_PATH,
    component: ArticleForm,
  },
];
