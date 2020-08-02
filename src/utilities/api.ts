import axios, { AxiosResponse } from 'axios';

const server : string = "http://localhost:5000";

axios.defaults.withCredentials = true

export default {
  startSession: (code : string) : Promise<void> => {
    return axios.post(`${server}/session`, {code: code});
  },
  joinSession: async (code : string) : Promise<string> => {
    const response : AxiosResponse = await axios.put(`${server}/session`, {code: code});
    return response.data;
  },

  startGame: () : Promise<void> => {
    return axios.post(`${server}/start`, null);
  },

  endTurn: () : Promise<void> => {
    return axios.post(`${server}/turn`)
  }
}