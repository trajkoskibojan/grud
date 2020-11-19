import axios from 'axios';
const instance = axios.create({
  baseURL: 'http://appointments.draft2017.com/appointments/',
});
export default instance;
