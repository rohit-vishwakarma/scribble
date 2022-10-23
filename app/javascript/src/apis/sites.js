import axios from "axios";

const fetch = () => axios.get("/site");

const update = async payload => {
  await axios.put(`/site`, payload);
};

const login = payload => axios.post("/site", payload);

const sitesApi = {
  fetch,
  update,
  login,
};

export default sitesApi;
