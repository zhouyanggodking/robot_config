import axios from 'axios';

export default class SettingsQuery {
  static getSettings() {
    return axios.get('/api/settings').then(res => res.data);
  }

  static updateSettings(camera, radio, gps) {
    return axios.put('api/settings', {
      camera, 
      radio, 
      gps
    });
  }
}
