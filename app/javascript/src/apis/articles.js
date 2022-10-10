import axios from "axios";

const fetch = () => axios.get("/articles");

const create = payload => {
  axios.post("/articles", payload);
};

const destroy = slug => {
  axios.delete(`/articles/${slug}`);
};

const update = (slug, payload) => {
  axios.put(`/articles/${slug}`, payload);
};

const articlesApi = {
  fetch,
  create,
  destroy,
  update,
};

export default articlesApi;
