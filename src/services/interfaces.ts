import { TConstructorIngridient, TIngridient, TOrders, TUserOrders } from "../types/ingridient";
import { TRegister, TUpUser, TUser } from "../utils/fetchWithRefresh";
import { ADD_INGRIDIENT, CLEAR_CONSTRUCTOR, DELETE_INGRIDIENT, SORT_INGRIDIENT } from "./burgerConstructor/actions";
import { GET_INGRIDIENTS__FAILURE, GET_INGRIDIENTS__REQUEST, GET_INGRIDIENTS__SUCCESS } from "./ingridients/actions";
import { GET_ORDER__FAILURE, GET_ORDER__REQUEST, GET_ORDER__SUCCESS } from "./orderDetails/actions";
import { GET_PASSWORD_FORGOT__FAILURE, GET_PASSWORD_FORGOT__REQUEST, GET_PASSWORD_FORGOT__SUCCESS } from "./passwordForgot/actions";
import { GET_PASSWORD_RESET__FAILURE, GET_PASSWORD_RESET__REQUEST, GET_PASSWORD_RESET__SUCCESS } from "./passwordReset/actions";
import { GET_LOGIN__FAILURE, GET_LOGIN__REQUEST, GET_LOGIN__SUCCESS, GET_LOGOUT__FAILURE, GET_LOGOUT__REQUEST, GET_LOGOUT__SUCCESS, GET_REGISTER__FAILURE, GET_REGISTER__REQUEST, GET_REGISTER__SUCCESS, GET_UPDATE__FAILURE, GET_UPDATE__REQUEST, GET_UPDATE__SUCCESS } from "./registers/actions";
import { WS_CONNECTION_CLOSED, WS_CONNECTION_CLOSED_USER, WS_CONNECTION_ERROR, WS_CONNECTION_ERROR_USER, WS_CONNECTION_START, WS_CONNECTION_START_USER, WS_CONNECTION_SUCCESS, WS_CONNECTION_SUCCESS_USER, WS_GET_ORDERS, WS_GET_ORDERS_USER } from "./websockets/actions";

export interface IGetConstructorAddAction {
    readonly type: typeof ADD_INGRIDIENT,
    readonly payload: TConstructorIngridient
}

export interface IGetConstructorDeleteAction {
    readonly type: typeof DELETE_INGRIDIENT,
    readonly payload: string
}

export interface IGetConstructorSortAction {
    readonly type: typeof SORT_INGRIDIENT,
    readonly payload: TConstructorIngridient
}

export interface IGetConstructorClearAction {
    readonly type: typeof CLEAR_CONSTRUCTOR,
}

export interface IGetIngridientsAction {
    readonly type: typeof GET_INGRIDIENTS__REQUEST,
}

export interface IGetIngridientSuccessAction {
    readonly type: typeof GET_INGRIDIENTS__SUCCESS,
    readonly payload: {data: TIngridient[]}
}

export interface IGetIngridientFailedAction {
    readonly type: typeof GET_INGRIDIENTS__FAILURE,
}

export interface IGetOrderAction {
    readonly type: typeof GET_ORDER__REQUEST,
}

export interface IGetOrderSuccessAction {
    readonly type: typeof GET_ORDER__SUCCESS,
    readonly payload: {order: { number: number}}
}

export interface IGetOrderFailedAction {
    readonly type: typeof GET_ORDER__FAILURE,
}

export interface IGetForgotAction {
    readonly type: typeof GET_PASSWORD_FORGOT__REQUEST,
}

export interface IGetForgotSuccessAction {
    readonly type: typeof GET_PASSWORD_FORGOT__SUCCESS,
    readonly payload: string
}

export interface IGetForgotFailedAction {
    readonly type: typeof GET_PASSWORD_FORGOT__FAILURE,
}

export interface IGetResetAction {
    readonly type: typeof GET_PASSWORD_RESET__REQUEST,
}

export interface IGetResetSuccessAction {
    readonly type: typeof GET_PASSWORD_RESET__SUCCESS,
    readonly payload: {success: boolean}
}

export interface IGetResetFailedAction {
    readonly type: typeof GET_PASSWORD_RESET__FAILURE,
}

export interface IGetRegisterAction {
    readonly type: typeof GET_REGISTER__REQUEST,
}

export interface IGetRegisterSuccessAction {
    readonly type: typeof GET_REGISTER__SUCCESS,
    readonly payload: TRegister
}

export interface IGetRegisterFailedAction {
    readonly type: typeof GET_REGISTER__FAILURE,
}

export interface IGetLoginAction {
    readonly type: typeof GET_LOGIN__REQUEST,
}

export interface IGetLoginSuccessAction {
    readonly type: typeof GET_LOGIN__SUCCESS,
    readonly payload: TUser
}

export interface IGetLoginFailedAction {
    readonly type: typeof GET_LOGIN__FAILURE,
}

export interface IGetUpAction {
    readonly type: typeof GET_UPDATE__REQUEST,
}

export interface IGetUpSuccessAction {
    readonly type: typeof GET_UPDATE__SUCCESS,
    readonly payload: TUpUser
}

export interface IGetUpFailedAction {
    readonly type: typeof GET_UPDATE__FAILURE,
}

export interface IGetLogoutAction {
    readonly type: typeof GET_LOGOUT__REQUEST,
}

export interface IGetLogoutSuccessAction {
    readonly type: typeof GET_LOGOUT__SUCCESS,
}

export interface IGetLogoutFailedAction {
    readonly type: typeof GET_LOGOUT__FAILURE,
}

export interface IWsConnectionStart {
    readonly type: typeof WS_CONNECTION_START
}

export interface IWsConnectionSuccess {
    readonly type: typeof WS_CONNECTION_SUCCESS
}

export interface IWsConnectionError {
    readonly type: typeof WS_CONNECTION_ERROR
}

export interface IWsConnectionClosed {
    readonly type: typeof WS_CONNECTION_CLOSED
}

export interface IWsGetOrders {
    readonly type: typeof WS_GET_ORDERS,
    readonly payload: TOrders
}

export interface IWsConnectionStartUser {
    readonly type: typeof WS_CONNECTION_START_USER
}

export interface IWsConnectionSuccessUser {
    readonly type: typeof WS_CONNECTION_SUCCESS_USER
}

export interface IWsConnectionErrorUser {
    readonly type: typeof WS_CONNECTION_ERROR_USER
}

export interface IWsConnectionClosedUser {
    readonly type: typeof WS_CONNECTION_CLOSED_USER
}

export interface IWsGetOrdersUser {
    readonly type: typeof WS_GET_ORDERS_USER,
    readonly payload: TUserOrders
}

export type TUnionConstructorActions = IGetConstructorAddAction | IGetConstructorDeleteAction | IGetConstructorSortAction | IGetConstructorClearAction;
export type TUnionIngridientsActions = IGetIngridientsAction | IGetIngridientSuccessAction | IGetIngridientFailedAction;
export type TUnionOrderActions = IGetOrderAction | IGetOrderSuccessAction | IGetOrderFailedAction;
export type TUnionForgotActions = IGetForgotAction | IGetForgotSuccessAction | IGetForgotFailedAction;
export type TUnionResetActions = IGetResetAction | IGetResetSuccessAction | IGetResetFailedAction;
export type TUserActions = IGetRegisterAction | IGetRegisterSuccessAction | IGetRegisterFailedAction | IGetLoginAction | IGetLoginSuccessAction | IGetLoginFailedAction | IGetUpAction | IGetUpSuccessAction | IGetUpFailedAction | IGetLogoutAction | IGetLogoutSuccessAction | IGetLogoutFailedAction;
export type TUnionWsAction =
    | IWsConnectionStart
    | IWsConnectionSuccess
    | IWsConnectionError
    | IWsConnectionClosed
    | IWsGetOrders

export type TUnionWsActionUser =
    | IWsConnectionStartUser
    | IWsConnectionSuccessUser
    | IWsConnectionErrorUser
    | IWsConnectionClosedUser
    | IWsGetOrdersUser

export interface IWsActions {
        readonly wsInit: string
        readonly onOpen: string
        readonly onClose: string
        readonly onError: string
        readonly onOrders: string
    }
    
export type TActions = TUnionConstructorActions | TUnionIngridientsActions | TUnionOrderActions | TUnionForgotActions | TUnionResetActions | TUserActions | TUnionWsAction | TUnionWsActionUser;