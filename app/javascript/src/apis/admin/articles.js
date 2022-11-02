import axios from "axios";

const fetch = () => axios.get("/api/admin/articles");

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

const articlesApi = {
  fetch,
  show,
  create,
  destroy,
  update,
  bulkUpdate,
  versions,
};

export default articlesApi;
