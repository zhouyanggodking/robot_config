import axios from 'axios';

export default class SettingsQuery {
  static getSettings() {
    return axios.get('/api/settings').then(res => res.data);
  }

  static updateSettings(cameraResolution, audioFrequency, gpsCoord) {
    return axios.put('api/settings', {
      cameraResolution, 
      audioFrequency, 
      gpsCoord
    });
  }
}
