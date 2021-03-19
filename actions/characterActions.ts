import {
    FETCH_LIST_CHARACTER_REQUEST,
    FETCH_LIST_CHARACTER_SUCCESS,
    FETCH_LIST_CHARACTER_ERROR,
    FETCH_CHARACTER_REQUEST,
    FETCH_CHARACTER_SUCCESS,
    FETCH_CHARACTER_ERROR,
} from '../constants/actionType';

export const getListCharacter = (page) => async dispatch => {
    try {
        dispatch({ type: FETCH_LIST_CHARACTER_REQUEST });

        const url = `https://breakingbadapi.com/api/characters?limit=10&offset=${10*page}`;
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