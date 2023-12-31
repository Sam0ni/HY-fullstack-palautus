import axios from "axios";
const baseUrl = "/api/persons"

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

const update = (id, objct) => {
    const request = axios.put(`${baseUrl}/${id}`, objct)
    return request.then(response => response.data)

}

export default { getAll, addNew, delPerson, update }