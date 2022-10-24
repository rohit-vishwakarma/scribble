import articlesApi from "apis/articles";
import { setAuthHeaders, registerIntercepts } from "apis/axios";
import categoriesApi from "apis/categories";
import organizationsApi from "apis/organizations";
import redirectionsApi from "apis/redirections";

export {
  articlesApi,
  setAuthHeaders,
  categoriesApi,
  redirectionsApi,
  organizationsApi,
  registerIntercepts,
};
