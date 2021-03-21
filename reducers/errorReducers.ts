// import constants
import {
    LOG_ERROR,
} from '../constants/actionType';
import initialState from "../constants/initialState"


function errorReducers(state = initialState.error, payload) {
    switch (payload.type) {
        case LOG_ERROR:
            return {
                error: payload.data
            };
        default:
            return state;
    }
}

export default errorReducers;