import { TUnionResetActions } from "../interfaces"
import { GET_PASSWORD_RESET__REQUEST, GET_PASSWORD_RESET__SUCCESS, GET_PASSWORD_RESET__FAILURE} from "./actions"

type TResetState = {
  email: string | boolean,
  isLoading: boolean,
  errors: null | boolean,
}

const initialState: TResetState = {
    email: '',
    isLoading: false,
    errors: null,
}

export default (state: TResetState = initialState, action: TUnionResetActions) => {
    switch(action.type) {
        case GET_PASSWORD_RESET__REQUEST: 
          return {
            ...state,
            isLoading: true,
          }
          case GET_PASSWORD_RESET__SUCCESS: 
          return {
            ...state,
            isLoading: false,
            errors: null,
            email: action.payload.success,
          }
          case GET_PASSWORD_RESET__FAILURE: 
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