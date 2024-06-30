import axios from 'axios'
const baseURL = "http://localhost:3001/persons"

const getAll = () => (
    axios.get(baseURL)
    .then(res => res.data)
)

const create = (newPerson) => (
    axios.post(baseURL, newPerson)
    .then(res => res.data)
)

const deletePerson = (id) => (
    axios.delete(`${baseURL}/${id}`)
    .then(res => res.data) 
)

const update = (id, newPerson) => (
    axios.put(`${baseURL}/${id}` , newPerson)
    .then(res => res.data)
)

export default { getAll, create, deletePerson, update }
