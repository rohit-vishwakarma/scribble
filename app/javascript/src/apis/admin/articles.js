import axios from "axios";

const fetch = payload =>
  axios.get(
    `/api/admin/articles/?search_term=${payload.search_term}&category_ids=
    ${payload.category_ids}&status=${payload.status}`
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

const bulkUpdate = async payload => {
  await axios.put("/api/admin/articles/bulk_update", payload);
};

const versions = id => axios.get(`/api/admin/articles/${id}/versions`);

const fetchPublished = () => axios.get("/api/admin/articles/published_list");

const articlesApi = {
  fetch,
  show,
  create,
  destroy,
  update,
  bulkUpdate,
  versions,
  fetchPublished,
};

export default articlesApi;
