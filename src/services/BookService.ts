import axios from "../helpers/axios";

const getAll = async () => {
  const response = await axios.get("books");
  return response;
};

const get = async (isbn: string) => {
  const response = await axios.get(`books/${isbn}`);
  return response;
};

export { getAll, get };
