import axios from 'axios';

const server : string = "http://localhost:5000";

axios.defaults.withCredentials = true

export default {
  startSession: async (code : string) : Promise<void> => {
    await axios.post(`${server}/start`, {code: code});
  },
  joinSession: async (code : string) : Promise<void> => {
    await axios.put(`${server}/start`, {code: code});
  },

  endTurn: async () : Promise<void> => {
    await axios.post(`${server}/turn`)
  }
}