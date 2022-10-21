import axios from "axios";

const fetch = () => axios.get("/articles");

const show = id => axios.get(`/articles/${id}`);

const create = async payload => {
  await axios.post("/articles", payload);
};

const destroy = async id => {
  await axios.delete(`/articles/${id}`);
};

const update = async (id, payload) => {
  await axios.put(`/articles/${id}`, payload);
};

const bulkUpdate = async payload => {
  await axios.put("/articles/bulk_update", payload);
};

const articlesApi = {
  fetch,
  show,
  create,
  destroy,
  update,
  bulkUpdate,
};

export default articlesApi;
