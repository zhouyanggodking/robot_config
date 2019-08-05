import axios from 'axios';
import localStorageHelper from '@/helpers/localStorageHelper';

const AUTH_TOKEN_KEY = 'AUTH_TOKEN';
const USER_NAME = 'USER_NAME';
const USER_AUTH_INFO_KEY = 'USER_AUTH_INFO';

export default class AuthQuery {
  static login(username, password) {
    return axios.post('/api/login', {
      phoneNumber: username,
      password
    },
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(success => {
      console.log(success);
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
  static getVerifyCode(phoneNumber) {
    return axios.post('/api/sms', {
      phoneNumber
    }).then(result => {
      return result.data;
    }, (err) => {
      return Promise.reject(err);
    });
  }

  static registerAccount(phoneNumber, password, verifyCode) {
    return axios.post('/api/signup', {
      phoneNumber,
      password,
      verifyCode
    }).then(success => {
      // write token into local storage (or cookie)
      localStorageHelper.setItem(AUTH_TOKEN_KEY, success.data.token);
      localStorageHelper.setItem(USER_NAME, phoneNumber);
      return Promise.resolve(success);
    }, (error) => {
      localStorageHelper.removeItem(AUTH_TOKEN_KEY);
      localStorageHelper.removeItem(USER_NAME);
      return Promise.reject(error.response.data);
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
