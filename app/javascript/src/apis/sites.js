import axios from "axios";

const fetch = () => axios.get("/sites");

const update = async (id, payload) => {
  await axios.put(`/sites/${id}`, payload);
};

const login = payload => axios.post("/sites", payload);

const sitesApi = {
  fetch,
  update,
  login,
};

export default sitesApi;
