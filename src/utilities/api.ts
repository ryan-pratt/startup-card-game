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

  getTurnNumber: async () : Promise<number> => {
    const response : AxiosResponse = await axios.get(`${server}/turn`);
    return parseInt(response.data);
  },
  endTurn: () : Promise<void> => {
    return axios.post(`${server}/turn`)
  },

  drawCard: async () : Promise<number> => {
    const response : AxiosResponse = await axios.get(`${server}/card`);
    return parseInt(response.data);
  },
  discard: async (cardId : number) : Promise<void> => {
    return axios.put(`${server}/card`, {cardId: cardId});
  },

  getHand: async () : Promise<number[]> => {
    const response : AxiosResponse = await axios.get(`${server}/hand`);
    return response.data.map((x : string) => parseInt(x));
  },
  commitHand: async (cards : number[]) : Promise<void> => {
    return axios.post(`${server}/hand`, {cards: cards});
  }
};