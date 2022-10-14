import axios from "axios";

const fetch = () => axios.get("/sites");

const update = async (id, payload) => {
  await axios.put(`/sites/${id}`, payload);
};

const sitesApi = {
  fetch,
  update,
};

export default sitesApi;
