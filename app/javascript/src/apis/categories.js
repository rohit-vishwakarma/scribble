import axios from "axios";

const fetch = () => axios.get("/categories");

const create = async payload => {
  await axios.post("/categories", payload);
};

const update = async (id, payload) => {
  await axios.put(`/categories/${id}`, payload);
};

const destroy = async id => {
  await axios.delete(`/categories/${id}`);
};

const categoriesApi = {
  fetch,
  create,
  update,
  destroy,
};

export default categoriesApi;
