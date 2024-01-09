import { TIngridient } from "../../types/ingridient";
import {
    request
  } from "../../utils/checkResponse";
  import { BASE_URL } from "../../utils/url";
  import { urls } from "../../utils/urls";
import { GET_INGRIDIENTS__REQUEST, GET_INGRIDIENTS__SUCCESS, GET_INGRIDIENTS__FAILURE } from "../constants";
import { AppDispatch, AppThunkAction, IIngridients } from "../types";

const INGRIDIENTSDATA = `${BASE_URL}${urls.ingridients}`;

export interface IGetIngridientsRequest {
  readonly type: typeof GET_INGRIDIENTS__REQUEST;
}

export interface IGetIngridientsSuccess {
  readonly type: typeof GET_INGRIDIENTS__SUCCESS;
  readonly payload: TIngridient[];
}

export interface IGetIngridientsFailure {
  readonly type: typeof GET_INGRIDIENTS__FAILURE;
}

export type TIngridientsActions =
  | IGetIngridientsRequest
  | IGetIngridientsSuccess
  | IGetIngridientsFailure;

export const getIngridientsAction = (): IGetIngridientsRequest => ({
  type: GET_INGRIDIENTS__REQUEST
});

export const getIngridientsSuccessAction = (data: TIngridient[]): IGetIngridientsSuccess => ({
  type: GET_INGRIDIENTS__SUCCESS,
  payload: data,
});

export const getIngridientsFailureAction = (): IGetIngridientsFailure => ({
  type: GET_INGRIDIENTS__FAILURE
});

export const getIngridientsData = (): AppThunkAction => {
  return async function (dispatch) {
    dispatch(getIngridientsAction());

    request<IIngridients>(INGRIDIENTSDATA)
      .then((data) => {
        dispatch(getIngridientsSuccessAction(data.data));
      })
      .catch(() => {
        dispatch(getIngridientsFailureAction());
      })
  }
};