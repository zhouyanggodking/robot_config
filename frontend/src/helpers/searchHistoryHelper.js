import arrayHelper from '@/helpers/arrayHelper';
import localStorageHelper from '@/helpers/localStorageHelper';

const SUGGESTION_LIST = 'SUGGESTION-LIST';
const SUGGESTION_MAX_LENGTH = 500;

export default class SearchHistoryHelper {
  static add(searchQuery) {
    // updating suggestionSet: first remove existing one
    let tmpSuggestionSet = SearchHistoryHelper.getAll().filter((item) => item !== searchQuery);
    // updating suggestionSet: then add it at the beginning
    tmpSuggestionSet.unshift(searchQuery);
    tmpSuggestionSet = tmpSuggestionSet.slice(0, SUGGESTION_MAX_LENGTH);
    // write it back and store it into localstorage
    localStorageHelper.setItem(SUGGESTION_LIST, JSON.stringify(tmpSuggestionSet));
    return tmpSuggestionSet;
  }

  static get(maxCount = 5) {
    return arrayHelper.takeFirstNElements(SearchHistoryHelper.getAll(), maxCount);
  }

  static getAll() {
    return JSON.parse(localStorageHelper.getItem(SUGGESTION_LIST) || '[]');
  }

  static removeAll() {
    const suggestionSet = localStorageHelper.setItem(SUGGESTION_LIST, []);
    return suggestionSet;
  }

  static remove(searchQuery) {
    // first remove it from suggestSet
    const suggestionSet = SearchHistoryHelper.getAll().filter((item) => item !== searchQuery);
    localStorageHelper.setItem(SUGGESTION_LIST, JSON.stringify(suggestionSet)); 
    return suggestionSet; 
  }
}
