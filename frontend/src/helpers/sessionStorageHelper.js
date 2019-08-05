/**
 * in browser private mode, sessionStorage is not avaiable
 */
export default class SessionStorageHelper {
  static available() {
    const test = 'test';
    try {
      sessionStorage.setItem(test, test);
      sessionStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }
  static getItem(key) {
    if (SessionStorageHelper.available()) {
      return sessionStorage.getItem(key);
    }

    return null;
  }

  static setItem(key, value) {
    if (SessionStorageHelper.available()) {
      sessionStorage.setItem(key, value);
    }
  }

  static removeItem(key) {
    if (SessionStorageHelper.available()) {
      sessionStorage.removeItem(key);
    }
  }
}
