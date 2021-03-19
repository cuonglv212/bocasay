// import constants
import {
    FETCH_LIST_CHARACTER_REQUEST,
    FETCH_LIST_CHARACTER_SUCCESS,
    FETCH_LIST_CHARACTER_ERROR,
    FETCH_CHARACTER_REQUEST,
    FETCH_CHARACTER_SUCCESS,
    FETCH_CHARACTER_ERROR,
} from '../constants/actionType';
import initialState from "../constants/initialState"


// bắt từng action type
function exampleReducers(state = initialState.character, payload) {
    switch (payload.type) {
        case FETCH_LIST_CHARACTER_REQUEST:
            return {
                ...state,
                isLoadingData: true
            };
        case FETCH_LIST_CHARACTER_SUCCESS:
            return {
                ...state,
                isLoadingData: false,
                data: [...state.data, ...payload.data]
            };
        case FETCH_LIST_CHARACTER_ERROR:
            return {
                ...state,
                isLoadingData: true,
                data: []
            };


        case FETCH_CHARACTER_REQUEST:
            return {
                ...state,
                isLoadingDetail: true
            };
        case FETCH_CHARACTER_SUCCESS:
            return {
                ...state,
                isLoadingDetail: false,
                detail: payload.data
            };
        case FETCH_CHARACTER_ERROR:
            return {
                ...state,
                isLoadingDetail: true,
                data: {}
            };

        default:
            return state;
    }
}

export default exampleReducers;