import axios from "axios";

const fetch = () => axios.get("/articles");

const articlesApi = {
  fetch,
};

export default articlesApi;
