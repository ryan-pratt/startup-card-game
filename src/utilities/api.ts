import axios, { AxiosResponse } from 'axios';

const server : string = "http://localhost:5000";

axios.defaults.withCredentials = true

export default {
  startSession: async (code : string) : Promise<void> => {
    await axios.post(`${server}/start`, {code: code});
  },
  joinSession: async (code : string) : Promise<string> => {
    const response : AxiosResponse = await axios.put(`${server}/start`, {code: code});
    return response.data
  },

  endTurn: async () : Promise<void> => {
    await axios.post(`${server}/turn`)
  }
}