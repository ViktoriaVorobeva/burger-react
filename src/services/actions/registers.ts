import { setCookie } from "../../utils/cookie";
import { TUserResponce, fetchWithRefresh, getRegist, login, logout, update } from "../../utils/fetchWithRefresh";
import {
  GET_REGISTER__REQUEST,
  GET_REGISTER__SUCCESS,
  GET_REGISTER__FAILURE,
  GET_LOGIN__REQUEST,
  GET_LOGIN__SUCCESS,
  GET_LOGIN__FAILURE,
  GET_UPDATE__REQUEST,
  GET_UPDATE__SUCCESS,
  GET_UPDATE__FAILURE,
  GET_LOGOUT__REQUEST,
  GET_LOGOUT__SUCCESS,
  GET_LOGOUT__FAILURE,
} from "../constants";
import { AppDispatch, AppThunkAction, TRegister, TUpUser, TUser } from "../types";

export interface IGetRegisterRequest {
  readonly type: typeof GET_REGISTER__REQUEST;
}

export interface IGetRegisterSuccess {
  readonly type: typeof GET_REGISTER__SUCCESS;
  readonly payload: TUpUser;
}

export interface IGetRegisterFailure {
  readonly type: typeof GET_REGISTER__FAILURE;
}

export interface IGetLoginRequest {
  readonly type: typeof GET_LOGIN__REQUEST;
}

export interface IGetLoginSuccess {
  readonly type: typeof GET_LOGIN__SUCCESS;
  readonly payload: TUpUser;
}

export interface IGetLoginFailure {
  readonly type: typeof GET_LOGIN__FAILURE;
}

export interface IGetUpRequest {
  readonly type: typeof GET_UPDATE__REQUEST;
}

export interface IGetUpSuccess {
  readonly type: typeof GET_UPDATE__SUCCESS;
  readonly payload: TUpUser;
}

export interface IGetUpFailure {
  readonly type: typeof GET_UPDATE__FAILURE;
}

export interface IGetOutRequest {
  readonly type: typeof GET_LOGOUT__REQUEST;
}

export interface IGetOutSuccess {
  readonly type: typeof GET_LOGOUT__SUCCESS;
}

export interface IGetOutFailure {
  readonly type: typeof GET_LOGOUT__FAILURE;
}

export type TUserActions =
  | IGetRegisterRequest
  | IGetRegisterSuccess
  | IGetRegisterFailure
  | IGetLoginRequest
  | IGetLoginSuccess
  | IGetLoginFailure  
  | IGetUpRequest
  | IGetUpSuccess
  | IGetUpFailure
  | IGetOutRequest
  | IGetOutSuccess
  | IGetOutFailure;

  export const getRegisterAction = (): IGetRegisterRequest => ({
    type: GET_REGISTER__REQUEST,
  });
  
  export const getRegisterSuccessAction = (data: TUpUser): IGetRegisterSuccess => ({
    type: GET_REGISTER__SUCCESS,
    payload: data,
  });
  
  export const getRegisterFailureAction = (): IGetRegisterFailure => ({
    type: GET_REGISTER__FAILURE,
  });

  export const getLoginAction = (): IGetLoginRequest => ({
    type: GET_LOGIN__REQUEST,
  });
  
  export const getLoginSuccessAction = (data: TUpUser): IGetLoginSuccess => ({
    type: GET_LOGIN__SUCCESS,
    payload: data,
  });
  
  export const getLoginFailureAction = (): IGetLoginFailure => ({
    type: GET_LOGIN__FAILURE,
  });

  export const getUpAction = (): IGetUpRequest => ({
    type: GET_UPDATE__REQUEST,
  });
  
  export const getUpSuccessAction = (data: TUpUser): IGetUpSuccess => ({
    type: GET_UPDATE__SUCCESS,
    payload: data,
  });
  
  export const getUpFailureAction = (): IGetUpFailure => ({
    type: GET_UPDATE__FAILURE,
  });

  export const getLogoutAction = (): IGetOutRequest => ({
    type: GET_LOGOUT__REQUEST,
  });
  
  export const getLogoutSuccessAction = (): IGetOutSuccess => ({
    type: GET_LOGOUT__SUCCESS,
  });
  
  export const getLogoutFailureAction = (): IGetOutFailure => ({
    type: GET_LOGOUT__FAILURE,
  });

export const getRegister = (form: TRegister): AppThunkAction => {
  return function (dispatch) {
    dispatch(getRegisterAction());
    getRegist(form)
      .then((data) => {
        const authToken = data.accessToken?.split("Bearer ")[1];
        if (authToken) {
          setCookie("token", authToken);
          localStorage.setItem("token", data.refreshToken);
        }
        dispatch(getRegisterSuccessAction({ ...data.user, ...form }));
      })
      .catch(() => {
        dispatch(getRegisterFailureAction());
      });
  };
};

export const getLogin = (form: TUser): AppThunkAction => {
  return function (dispatch: AppDispatch) {
    dispatch(getLoginAction());
    login(form)
      .then((data) => {
        const authToken = data.accessToken?.split("Bearer ")[1];
        if (authToken) {
          setCookie("token", authToken);
          localStorage.setItem("token", data.refreshToken);
        }
        dispatch(getLoginSuccessAction({ ...data.user, ...form }));
      })
      .catch(() => {
        dispatch(getLoginFailureAction());
      });
  };
};

export const updateUser = (form: TUpUser): AppThunkAction => {
  return function (dispatch) {
    dispatch(getUpAction());
    update(form)
      .then((data) => {
        dispatch(getUpSuccessAction({ ...data.user, ...form }));
      })
      .catch(() => {
        dispatch(getUpFailureAction());
      });
  };
};

export const getLogOut = (): AppThunkAction => {
  return function (dispatch) {
    dispatch(getLogoutAction());
    logout()
      .then(() => {
        dispatch(getLogoutSuccessAction());
        localStorage.clear();
        setCookie("token", "");
      })
      .catch(() => {
        dispatch(getLogoutFailureAction());
      });
  };
};

export const getUserWithRefresh = (): AppThunkAction => {
  return function (dispatch) {
    dispatch(getRegisterAction());
    fetchWithRefresh<TUserResponce>().then((data) => {
      if (data) {
        dispatch(getRegisterSuccessAction(data.user));
      } else {
        dispatch(getRegisterFailureAction());
      }
    }).catch(() => {
      dispatch(getRegisterFailureAction());
    });
  };
};
