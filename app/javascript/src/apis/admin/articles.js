import axios from "axios";

const fetch = payload =>
  axios.get(
    `/api/admin/articles/?search_term=${payload.searchTerm}&category_ids=
    ${payload.categoryIds}&status=${payload.status}`
  );

const show = id => axios.get(`/api/admin/articles/${id}`);

const create = async payload => {
  await axios.post("/api/admin/articles", payload);
};

const destroy = async id => {
  await axios.delete(`/api/admin/articles/${id}`);
};

const update = async (id, payload) => {
  await axios.put(`/api/admin/articles/${id}`, payload);
};

const versions = id => axios.get(`/api/admin/articles/${id}/versions`);

const fetchPublished = payload =>
  axios.get(
    `/api/admin/articles/published_list/?page_no=${payload.pageNumber}`
  );

const count = payload =>
  axios.get(`/api/admin/articles/count/?category_ids=${payload.categoryIds}`);

const articlesApi = {
  fetch,
  show,
  create,
  destroy,
  update,
  versions,
  fetchPublished,
  count,
};

export default articlesApi;
