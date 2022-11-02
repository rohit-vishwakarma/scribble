import axios from "axios";

const fetch = () => axios.get("/api/admin/categories");

const fetchPublic = () => axios.get("/api/public/categories");

const create = async payload => {
  await axios.post("/api/admin/categories", payload);
};

const update = async (id, payload) => {
  await axios.put(`/api/admin/categories/${id}`, payload);
};

const destroy = async id => {
  await axios.delete(`/api/admin/categories/${id}`);
};

const positionUpdate = async payload => {
  await axios.put("/api/admin/categories/position_update", payload);
};

const categoriesApi = {
  fetch,
  create,
  update,
  destroy,
  positionUpdate,
  fetchPublic,
};

export default categoriesApi;
