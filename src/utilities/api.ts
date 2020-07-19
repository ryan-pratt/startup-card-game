import axios from 'axios';

const server : string = "http://localhost:5000";

export default {
  startSession: async (code : string) : Promise<void> => {
    await axios.post(`${server}/start`, {code: code});
  }
}