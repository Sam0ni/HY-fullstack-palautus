import axios from "axios";
const baseUrl = "http://localhost:3001/persons"

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const addNew = (newObject) => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const delPerson = (id) => {
    axios
    .delete(`${baseUrl}/${id}`)
}

export default { getAll, addNew, delPerson }