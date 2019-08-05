import axios from 'axios';

export default class DeviceQuery {
  static getDeviceInfo() {
    return axios.get('/api/device').then(res => res.data);
  }
}
