import axios from "axios";

const fetch = () => axios.get("/organization");

const update = async payload => {
  await axios.put(`/organization`, payload);
};

const login = payload => axios.post("/organization", payload);

const organizationsApi = {
  fetch,
  update,
  login,
};

export default organizationsApi;
