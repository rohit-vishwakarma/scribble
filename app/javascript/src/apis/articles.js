import axios from "axios";

const fetch = () => axios.get("/articles");

const create = payload => {
  axios.post("/articles", payload);
};

const destroy = id => {
  axios.delete(`/articles/${id}`);
};

const update = (id, payload) => {
  axios.put(`/articles/${id}`, payload);
};

const articlesApi = {
  fetch,
  create,
  destroy,
  update,
};

export default articlesApi;
