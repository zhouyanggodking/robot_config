import axios from 'axios';

export default class WifiQuery {
  static getWifiInfo() {
    return axios.get('/api/wifi').then(res => res.data);
  }

  static getAvailableWifiList() {
    return axios.get('/api/wifi_list').then(res => res.data);
  }

  static updateWifiInfo(name, password) {
    return axios.post('/api/wifi', {
      name,
      password
    });
  }
}
