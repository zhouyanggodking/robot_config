import axios from 'axios';

export default class QuestionQuery {
  static getNewsList(source) {
    return axios.get(`/api/${source}_hot`).then(res => res.data, () => {
      return axios.get('/mock/news-list.json').then(res => res.data);
    });
  }

  static getAccounts() {
    return axios.get('/api/accounts').then(res => res.data, () => {
      return axios.get('/mock/accounts.json').then(res => res.data);
    });
  }

  static addAccount(data) {
    return axios.post('/api/account', data);
  }

  static updateAccountStatus(accountId, status) {
    return axios.put(`/api/accout_status/${accountId}`, {
      status
    });
  }
}
