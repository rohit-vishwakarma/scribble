import articlesApi from "apis/articles";
import { setAuthHeaders, registerIntercepts } from "apis/axios";
import categoriesApi from "apis/categories";
import redirectionsApi from "apis/redirections";
import sitesApi from "apis/sites";

export {
  articlesApi,
  setAuthHeaders,
  categoriesApi,
  redirectionsApi,
  sitesApi,
  registerIntercepts,
};