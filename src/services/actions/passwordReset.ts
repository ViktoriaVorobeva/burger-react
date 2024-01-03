import { request } from "../../utils/checkResponse";
import { BASE_URL } from "../../utils/url";
import { urls } from "../../utils/urls";
import {
  GET_PASSWORD_RESET__REQUEST,
  GET_PASSWORD_RESET__SUCCESS,
  GET_PASSWORD_RESET__FAILURE,
} from "../constants";
import { AppDispatch, AppThunkAction, IFormReset, IReset } from "../types";

const RESETPASSWORDDATA = `${BASE_URL}${urls.reset}`;

export interface IGetResetRequest {
  readonly type: typeof GET_PASSWORD_RESET__REQUEST;
}

export interface IGetResetSuccess {
  readonly type: typeof GET_PASSWORD_RESET__SUCCESS;
  readonly payload: boolean;
}

export interface IGetResetFailure {
  readonly type: typeof GET_PASSWORD_RESET__FAILURE;
}

export type TResetActions =
  | IGetResetRequest
  | IGetResetSuccess
  | IGetResetFailure;

export const getResetAction = (): IGetResetRequest => ({
  type: GET_PASSWORD_RESET__REQUEST,
});

export const getResetSuccessAction = (data: boolean): IGetResetSuccess => ({
  type: GET_PASSWORD_RESET__SUCCESS,
  payload: data,
});

export const getResetFailureAction = (): IGetResetFailure => ({
  type: GET_PASSWORD_RESET__FAILURE,
});

export const getPasswordReset = (form: IFormReset): AppThunkAction => {
  return function (dispatch: AppDispatch) {
    dispatch(getResetAction());
    request<IReset>(RESETPASSWORDDATA, {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((data) => {
        dispatch(getResetSuccessAction(data.success));
      })
      .catch(() => {
        dispatch(getResetFailureAction());
      });
  };
};
