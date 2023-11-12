import axios from "axios";
const baseUrl = "/api/blogs";

const headers = {
  Authorization: window.localStorage.getItem("loggedUser")
    ? `Bearer ${JSON.parse(window.localStorage.getItem("loggedUser")).token}`
    : null,
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const createBlog = async (blog) => {
  const auth = headers;
  const config = {
    headers: auth,
  };
  const response = await axios.post(baseUrl, blog, config);
  return response.data;
};

const updateBlog = async ({ id, blog }) => {
  const auth = headers;
  const config = {
    headers: auth,
  };
  const response = await axios.put(`${baseUrl}/${id}`, blog, config);
  return response.data;
};

const deleteBlog = async (id) => {
  const auth = headers;
  const config = {
    headers: auth,
  };
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};

export default { getAll, createBlog, updateBlog, deleteBlog };
