import axios from "axios";

const fetch = () => axios.get("/articles");

const create = payload => {
  axios.post("/articles", payload);
};

const articlesApi = {
  fetch,
  create,
};

export default articlesApi;
