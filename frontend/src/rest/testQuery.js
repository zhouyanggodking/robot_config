import axios from 'axios';

export default class TestQuery {
  // radio
  static startTestRadio() {
    return axios.post('/api/start_test_radio').then(res => res.data);
  }

  static stopTestRadio() {
    return axios.post('/api/stop_test_radio').then(res => res.data);
  }

  // audio, microphone
  static startRecordingAudio() {
    return axios.post('/api/start_recording_audio').then(res => res.data);
  }

  static stopRecordingAudio() {
    return axios.post('/api/stop_recording_audio').then(res => res.data);
  }

  static playRecordedAudio() {
    return axios.post('/api/play_recorded_audio').then(res => res.data);
  }

  // monitor
  static startTestMonitor() {
    return axios.post('/api/start_test_monitor').then(res => res.data);
  }

  static stopTestMonitor() {
    return axios.post('/api/stop_test_monitor').then(res => res.data);
  }

  // camera
  static captureCamera() {
    return axios.post('/api/capture_camera').then(res => res.data);
  }

  // keypad
  static getKeypadPressedKeys() {
    return axios.post('/api/keypad').then(res => res.data || []);
  }
}
