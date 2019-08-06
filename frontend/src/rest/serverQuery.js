import axios from 'axios';

export default class ServerQuery {
  static getServerInfo() {
    return axios.get('/api/server').then(res => res.data);
  }
}
