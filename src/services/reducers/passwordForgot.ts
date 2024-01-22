import { TForgotActions } from "../actions";
import { GET_PASSWORD_FORGOT__REQUEST, GET_PASSWORD_FORGOT__SUCCESS, GET_PASSWORD_FORGOT__FAILURE} from "../constants"

export type TForgotState = {
  email: string,
  isLoading: boolean,
  errors: null | boolean,
};

export const initialStateForgot: TForgotState = {
    email: '',
    isLoading: false,
    errors: null,
}

export const forgotPasswordReducer = (state = initialStateForgot, action: TForgotActions): TForgotState => {
    switch(action.type) {
        case GET_PASSWORD_FORGOT__REQUEST: 
          return {
            ...state,
            isLoading: true,
          }
          case GET_PASSWORD_FORGOT__SUCCESS: 
          return {
            ...state,
            isLoading: false,
            errors: null,
            email: action.payload,
          }
          case GET_PASSWORD_FORGOT__FAILURE: 
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