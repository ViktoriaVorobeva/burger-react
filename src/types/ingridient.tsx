import { ThunkAction } from 'redux-thunk';
import { ActionCreator } from 'redux';
import { store } from "../services/store";
import { TActions } from '../services/interfaces';

export type TIngridient = {
    _id: string,
    name: string,
    type: string,
    proteins: number,
    fat: number,
    carbohydrates: number,
    calories: number,
    price: number,
    image: string,
    image_mobile: string,
    image_large: string,
    __v: number
  }

export type TConstructorIngridient = {
  id: string,
  type: string,
  uniqueId?: string
}  

export type TOptionsDateFormat = {
  timezone: 'Moscow',
  hour: 'numeric',
  minute: 'numeric',
  timeZoneName: "short",
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

export type TOrderProps = {
  order: TOrder
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

export type TUnionAction = TActions;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, RootState, unknown, TUnionAction>
>;

//export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, TUnionAction>;
