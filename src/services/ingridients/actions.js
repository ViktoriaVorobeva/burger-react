import {
  request
} from "../../utils/checkResponse";

export const GET_INGRIDIENTS__REQUEST = 'GET_INGRIDIENTS__REQUEST';
export const GET_INGRIDIENTS__SUCCESS = 'GET_INGRIDIENTS__SUCCESS';
export const GET_INGRIDIENTS__FAILURE = 'GET_INGRIDIENTS__FAILURE';

export const getIngridientsData = (url) => {
  return async function (dispatch) {
    dispatch({
      type: GET_INGRIDIENTS__REQUEST,
    });

    request(url)
      .then((data) => {
        dispatch({
          type: GET_INGRIDIENTS__SUCCESS,
          payload: data.data,
        });
      })
      .catch(() => {
        dispatch({
          type: GET_INGRIDIENTS__FAILURE,
        });
      })
  }
};