import localStorageHelper from '@/helpers/localStorageHelper';

const AUTH_TOKEN_KEY = 'AUTH_TOKEN';
const USER_NAME = 'USER_NAME';

export default class AuthService {
  static isLoggedIn() { // may not reliable if use disabled localstorage (eg. Private mode)
    return !!AuthService.getAuthToken();
  }

  static getAuthToken() {
    return localStorageHelper.getItem(AUTH_TOKEN_KEY);
  }

  static getLoggedUserName() {
    return localStorageHelper.getItem(USER_NAME);
  }
}
