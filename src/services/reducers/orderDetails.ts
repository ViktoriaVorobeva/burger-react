import { TOrderActions } from "../actions";
import { GET_ORDER__REQUEST, GET_ORDER__FAILURE, GET_ORDER__SUCCESS} from "../constants"

export type TOrderState = {
  order: number | null,
  isLoading: boolean,
  errors: null | boolean,
};

export const initialStateOrder: TOrderState = {
    order: null,
    isLoading: false,
    errors: null,
}

export const orderReducer = (state = initialStateOrder, action: TOrderActions): TOrderState => {
    switch(action.type) {
        case GET_ORDER__REQUEST: 
          return {
            ...state,
            isLoading: true,
          }
          case GET_ORDER__SUCCESS: 
          return {
            ...state,
            isLoading: false,
            errors: null,
            order: action.payload,
          }
          case GET_ORDER__FAILURE: 
          return {
            ...state,
            isLoading: false,
            errors: true,
            order: null
          }
        default: 
            return state
    }
}