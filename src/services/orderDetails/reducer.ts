import { TUnionOrderActions } from "../interfaces"
import { GET_ORDER__REQUEST, GET_ORDER__FAILURE, GET_ORDER__SUCCESS} from "./actions"

type TOrderState = {
  order: [] | number,
  isLoading: boolean,
  errors: null | boolean,
}

const initialState: TOrderState = {
    order: [],
    isLoading: false,
    errors: null,
}

export default (state: TOrderState = initialState, action: TUnionOrderActions) => {
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
            order: action.payload.order.number,
          }
          case GET_ORDER__FAILURE: 
          return {
            ...state,
            isLoading: false,
            errors: true,
            order: []
          }
        default: 
            return state
    }
}