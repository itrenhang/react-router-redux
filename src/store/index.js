import { combineReducers } from 'redux';
import listData from './listData.js';
import tabActiveKey from './tabActiveKey.js';
const allReducers = {
  listData,
  tabActiveKey
}

const rootReducer = combineReducers(allReducers);

export default rootReducer;