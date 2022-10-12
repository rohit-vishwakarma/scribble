import axios from "axios";

const fetch = () => axios.get("/articles");

const show = slug => axios.get(`/articles/${slug}`);

const create = async payload => {
  await axios.post("/articles", payload);
};

const destroy = async slug => {
  await axios.delete(`/articles/${slug}`);
};

const update = async (slug, payload) => {
  await axios.put(`/articles/${slug}`, payload);
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
