import axios from "axios";

const fetch = () => axios.get("/redirections");

const create = async payload => {
  await axios.post("/redirections", payload);
};

const update = async (id, payload) => {
  await axios.put(`/redirections/${id}`, payload);
};

const destroy = async (id, payload) => {
  await axios.delete(`/redirections/${id}`, payload);
};

const redirectionsApi = {
  fetch,
  create,
  update,
  destroy,
};

export default redirectionsApi;
