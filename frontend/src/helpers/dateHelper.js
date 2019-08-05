export default class dateHelper {
  static formatDate(type) {
    let endTime = new Date();
    let startTime = new Date();
    endTime.setTime(endTime.getTime());
    endTime = endTime.toISOString().split('T')[0];
    if (type === 'week') {
      startTime.setTime(startTime.getTime() - (3600 * 1000 * 7 * 24));
      startTime = startTime.toISOString().split('T')[0];
    } else if (type === 'month') {
      startTime.setTime(startTime.getTime() - (3600 * 1000 * 30 * 24));
      startTime = startTime.toISOString().split('T')[0];
    } else if (type === 'threeMonth') {
      startTime.setTime(startTime.getTime() - (3600 * 1000 * 30 * 3 * 24));
      startTime = startTime.toISOString().split('T')[0];
    }
    return [startTime, endTime];
  }
}
