import axios from "axios";

const fetch = () => axios.get("/categories");

const create = payload => {
  axios.post("/categories", payload);
};

const update = (id, payload) => {
  axios.put(`/categories/${id}`, payload);
};

const categoriesApi = {
  fetch,
  create,
  update,
};

export default categoriesApi;
