import { combineReducers } from 'redux';
import taskReducer from './task/reducer';

export const reducer = combineReducers([
  taskReducer
])