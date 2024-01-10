import { store } from "../store";
import {
  TConstructorActions,
  TIngridientsActions,
  TOrderActions,
  TForgotActions,
  TResetActions,
  TUserActions,
  TUnionWsAction,
  TUnionWsActionUser,
} from "../actions";
import type { ThunkAction, ThunkDispatch } from "redux-thunk";

export * from "./ingridientConstructor";
export * from "./ingridients";
export * from "./order";
export * from "./forgot";
export * from "./reset";
export * from "./registers";

export type RootState = ReturnType<typeof store.getState>;

type TApplicationActions =
  | TConstructorActions
  | TIngridientsActions
  | TOrderActions
  | TForgotActions
  | TResetActions
  | TUserActions
  |TUnionWsAction
  |TUnionWsActionUser;

export type AppDispatch = ThunkDispatch<
  RootState,
  unknown,
  TApplicationActions
>;
export type AppThunkAction<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  TApplicationActions
>;

export interface AppActions {
  readonly wsInit: string
  readonly onOpen: string
  readonly onClose: string
  readonly onError: string
  readonly onOrders: string
}

export type TOrder = {
  ingredients: Array<string>,
  _id: string,
  status: string,
  number: number,
  createdAt: string,
  updatedAt: string,
  name: string
}

export type TOrders = {
  success: boolean,
  orders: Array<TOrder>,
  total: number,
  totalToday: number
}

export type TUserOrders = {
  success: boolean,
  orders: Array<TOrder>
}

export type TOrderProps = {
  order: TOrder
}
