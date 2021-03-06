import axios from 'axios'



//json-server --watch db.json
const baseUrl = '/api/persons'

const getAll = async () => {
    const request = axios.get(baseUrl)
    const response = await request
    return response.data
  }
  
  const create = async (newObject) => {
    const request = axios.post(baseUrl, newObject)
    const response = await request
    console.log(response,'response');
      return response.data
  }
  
  const del = async (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    const response = await request
    console.log(response,'response');
      return response
  }
  const update = async (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    const response = await request
    console.log(response,'updateresponse');
    return response.data
  }
  
  export default { getAll, create, del,update }