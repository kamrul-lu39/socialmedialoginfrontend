import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const fetchData = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createItem = async (item) => {
  const response = await axios.post(API_URL, item);
  return response.data;
};
