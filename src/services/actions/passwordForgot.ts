import { request } from "../../utils/checkResponse";
import { BASE_URL } from "../../utils/url";
import { urls } from "../../utils/urls";
import {
  GET_PASSWORD_FORGOT__REQUEST,
  GET_PASSWORD_FORGOT__SUCCESS,
  GET_PASSWORD_FORGOT__FAILURE,
} from "../constants";
import { AppDispatch, AppThunkAction, IForgot } from "../types";

const FORGOTPASSWORDDATA = `${BASE_URL}${urls.forgot}`;

export interface IGetForgotRequest {
  readonly type: typeof GET_PASSWORD_FORGOT__REQUEST;
}

export interface IGetForgotSuccess {
  readonly type: typeof GET_PASSWORD_FORGOT__SUCCESS;
  readonly payload: string;
}

export interface IGetForgotFailure {
  readonly type: typeof GET_PASSWORD_FORGOT__FAILURE;
}

export type TForgotActions =
  | IGetForgotRequest
  | IGetForgotSuccess
  | IGetForgotFailure;

export const getForgotAction = (): IGetForgotRequest => ({
  type: GET_PASSWORD_FORGOT__REQUEST,
});

export const getForgotSuccessAction = (email: string): IGetForgotSuccess => ({
  type: GET_PASSWORD_FORGOT__SUCCESS,
  payload: email,
});

export const getForgotFailureAction = (): IGetForgotFailure => ({
  type: GET_PASSWORD_FORGOT__FAILURE,
});

export const getPasswordForgot = (email: string): AppThunkAction => {
  return function (dispatch: AppDispatch) {
    dispatch(getForgotAction());
    request<IForgot>(FORGOTPASSWORDDATA, {
      method: "POST",
      body: JSON.stringify({
        email: email,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        dispatch(getForgotSuccessAction(email));
      })
      .catch(() => {
        dispatch(getForgotFailureAction());
      });
  };
};
