// import constants
import {
    FETCH_LIST_CHARACTER_REQUEST,
    FETCH_LIST_CHARACTER_SUCCESS,
    FETCH_LIST_CHARACTER_ERROR,
    FETCH_CHARACTER_REQUEST,
    FETCH_CHARACTER_SUCCESS,
    FETCH_CHARACTER_ERROR,
    FETCH_QUOTE_ERROR,
    FETCH_QUOTE_SUCCESS,
    FETCH_QUOTE_REQUEST,
    RESET_DETAIL,
} from '../constants/actionType';
import initialState from "../constants/initialState"


function characterReducers(state = initialState.character, payload) {
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

        case FETCH_QUOTE_REQUEST:
            return {
                ...state,
            };
        case FETCH_QUOTE_SUCCESS:
            return {
                ...state,
                quote: payload.data
            };
        case FETCH_QUOTE_ERROR:
            return {
                ...state,
                quote: {}
            };

        case RESET_DETAIL:
            return {
                ...state,
                detail: {}
            };
        default:
            return state;
    }
}

export default characterReducers;