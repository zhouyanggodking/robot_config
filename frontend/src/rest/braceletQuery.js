import axios from 'axios';

export default class BraceletQuery {
  static getConfiguredBraceletList() {
    return axios.get('/api/bracelet_list').then(res => res.data || []);
  }

  static getBraceletInfo(id) {
    return axios.get(`/api/bracelet/${id}`).then(res => res.data);
  }

  static updateBracelet(id, mac) {
    return axios.put(`api/bracelet/${id}`, {
      mac
    });
  }

  static addBracelet(mac) {
    return axios.post('api/bracelet', {
      mac
    });
  }

  static deleteBracelet(id) {
    return axios.delete(`api/bracelet/${id}`);
  }

  static getScannedBraceletList() {
    return axios.get('/api/scan_bracelet_list').then(res => res.data);
  }
}
