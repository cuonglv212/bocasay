// reducers/index.jsjs
import { combineReducers } from 'redux';
import characterReducers from './characterReducers';
import errorReducers from './errorReducers';

const reducers = combineReducers({
	characterReducers: characterReducers,
	errorReducers: errorReducers,
});

export default (state, action) => reducers(state, action);