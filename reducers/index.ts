// reducers/index.jsjs
import { combineReducers } from 'redux';
import characterReducers from './characterReducers';

const reducers = combineReducers({
	characterReducers: characterReducers,
});

export default (state, action) => reducers(state, action);