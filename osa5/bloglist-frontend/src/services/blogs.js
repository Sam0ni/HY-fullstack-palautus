import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createBlog = async (token, blog) => {
    const auth = `Bearer ${token}`
    const config = {
      headers: { Authorization: auth}
    }
    const response = await axios.post(baseUrl, blog, config)
    return response.data
  }

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, createBlog }