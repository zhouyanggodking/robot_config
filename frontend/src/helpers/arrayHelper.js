/**
 * take first N element of array
 */
export default class ArrayHelper {
  static takeFirstNElements(arr, count) {
    return arr.filter((item, index) => index < count);
  }
}
