import { TResetActions } from "../actions";
import { GET_PASSWORD_RESET__REQUEST, GET_PASSWORD_RESET__SUCCESS, GET_PASSWORD_RESET__FAILURE} from "../constants"

export type TResetState = {
  email: boolean | string,
  isLoading: boolean,
  errors: null | boolean,
};

export const initialStateReset: TResetState = {
    email: '',
    isLoading: false,
    errors: null,
}

export const resetPasswordReducer = (state = initialStateReset, action: TResetActions): TResetState => {
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
            email: action.payload,
          }
          case GET_PASSWORD_RESET__FAILURE: 
          return {
            ...state,
            isLoading: false,
            errors: true,
            email: ''
          }
        default: 
            return state
    }
}