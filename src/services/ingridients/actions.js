import {
  request
} from "../../utils/checkResponse";
import { BASE_URL } from "../../utils/url";
import { urls } from "../../utils/urls";

export const GET_INGRIDIENTS__REQUEST = 'GET_INGRIDIENTS__REQUEST';
export const GET_INGRIDIENTS__SUCCESS = 'GET_INGRIDIENTS__SUCCESS';
export const GET_INGRIDIENTS__FAILURE = 'GET_INGRIDIENTS__FAILURE';

const INGRIDIENTSDATA = `${BASE_URL}${urls.ingridients}`;

export const getIngridientsData = () => {
  return async function (dispatch) {
    dispatch({
      type: GET_INGRIDIENTS__REQUEST,
    });

    request(INGRIDIENTSDATA)
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