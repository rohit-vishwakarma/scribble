import axios from "axios";

const fetch = () => axios.get("/articles");

const show = slug => axios.get(`/articles/${slug}`);

const create = payload => {
  axios.post("/articles", payload);
};

const destroy = slug => {
  axios.delete(`/articles/${slug}`);
};

const update = (slug, payload) => {
  axios.put(`/articles/${slug}`, payload);
};

const bulkUpdate = payload => {
  axios.put("/articles/bulk_update", payload);
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
