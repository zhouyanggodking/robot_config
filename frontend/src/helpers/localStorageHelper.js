/**
 * in browser private mode, localStorage is not avaiable
 */
export default class LocalStorageHelper {
  static available() {
    const test = 'test';
    try {
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }
  static getItem(key) {
    if (LocalStorageHelper.available()) {
      return localStorage.getItem(key);
    }

    return null;
  }

  static setItem(key, value) {
    if (LocalStorageHelper.available()) {
      localStorage.setItem(key, value);
    }
  }

  static removeItem(key) {
    if (LocalStorageHelper.available()) {
      localStorage.removeItem(key);
    }
  }
}
