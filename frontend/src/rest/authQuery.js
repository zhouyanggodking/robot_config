import axios from 'axios';
import localStorageHelper from '@/helpers/localStorageHelper';

const AUTH_TOKEN_KEY = 'AUTH_TOKEN';
const USER_NAME = 'USER_NAME';
const USER_AUTH_INFO_KEY = 'USER_AUTH_INFO';

export default class AuthQuery {
  static login(username, password) {
    return axios.post('/api/login', {
      username,
      password
    },
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(success => {
      // write token into local storage (or cookie)
      localStorageHelper.setItem(AUTH_TOKEN_KEY, success.data.token);
      localStorageHelper.setItem(USER_NAME, username);
      return Promise.resolve(success);
    }, (error) => {
      localStorageHelper.removeItem(AUTH_TOKEN_KEY);
      localStorageHelper.removeItem(USER_NAME);
      return Promise.reject(error);
    });
  }

  static logout() {
    return axios.delete('/api/logout').then(success => {
      // write token into local storage (or cookie)
      localStorageHelper.removeItem(AUTH_TOKEN_KEY);
      localStorageHelper.removeItem(USER_NAME);
      localStorageHelper.removeItem(USER_AUTH_INFO_KEY); // clear auth info to prevent next auto login
      return Promise.resolve(success);
    }, (error) => {
      localStorageHelper.removeItem(AUTH_TOKEN_KEY);
      localStorageHelper.removeItem(USER_NAME);
      localStorageHelper.removeItem(USER_AUTH_INFO_KEY); // clear auth info to prevent next auto login
      return Promise.reject(error);
    });
  }
}
