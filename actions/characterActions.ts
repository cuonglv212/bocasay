import {
    FETCH_LIST_CHARACTER_REQUEST,
    FETCH_LIST_CHARACTER_SUCCESS,
    FETCH_LIST_CHARACTER_ERROR,
    FETCH_CHARACTER_REQUEST,
    FETCH_CHARACTER_SUCCESS,
    FETCH_CHARACTER_ERROR,
    FETCH_QUOTE_REQUEST,
    FETCH_QUOTE_SUCCESS,
    FETCH_QUOTE_ERROR,
    RESET_DETAIL,
    LOG_ERROR,
} from '../constants/actionType';

export const getListCharacter = (page) => async dispatch => {
    try {
        dispatch({ type: FETCH_LIST_CHARACTER_REQUEST });

        const url = `https://breakingbadapi.com/api/characters?limit=10&offset=${10 * page}`;
        const response = await fetch(url)
        const responseBody = await response.json();
        return dispatch({
            type: FETCH_LIST_CHARACTER_SUCCESS,
            data: responseBody
        });
    } catch (error) {
        console.error(error);
        return dispatch({
            type: FETCH_LIST_CHARACTER_ERROR,
            message: error
        });
    }
}

export const getCharacterDetail = (id) => async dispatch => {
    try {
        dispatch({ type: FETCH_CHARACTER_REQUEST });

        const url = `https://breakingbadapi.com/api/characters/${id}`;
        const response = await fetch(url)
        const responseBody = await response.json();
        dispatch({
            type: FETCH_CHARACTER_SUCCESS,
            data: responseBody[0] || {}
        });
    } catch (error) {
        console.error(error);
        dispatch({
            type: FETCH_CHARACTER_ERROR,
            message: error
        });
    }
}

export const getRandomQuote = () => async dispatch => {
    try {
        dispatch({ type: FETCH_QUOTE_REQUEST });

        const url = `https://breakingbadapi.com/api/quote/random`;
        const response = await fetch(url)
        const responseBody = await response.json();
        dispatch({
            type: FETCH_QUOTE_SUCCESS,
            data: responseBody[0] || {}
        });
    } catch (error) {
        console.error(error);
        dispatch({
            type: FETCH_QUOTE_ERROR,
            message: error
        });
    }
}

export const resetDetail = () => async dispatch => {
    dispatch({
        type: RESET_DETAIL
    });
}

export const logError = (error) => async dispatch => {
    dispatch({
        type: LOG_ERROR,
        data: error
    });
}