import axios from "axios";

const fetch = () => axios.get("/articles");

const create = payload => {
  axios.post("/articles", payload);
};

const destroy = id => {
  axios.delete(`/articles/${id}`);
};

const articlesApi = {
  fetch,
  create,
  destroy,
};

export default articlesApi;
