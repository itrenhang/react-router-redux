import { combineReducers } from 'redux';
import isLogin from './rootRedux.js';
import modifyRedux from '../pages/modify/modifyRedux.js';
const allReducers = {
  isLogin,
  modifyRedux
}

const rootReducer = combineReducers(allReducers);

export default rootReducer;