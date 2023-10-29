import { GET_REGISTER__REQUEST, GET_REGISTER__SUCCESS, GET_REGISTER__FAILURE, GET_REGISTER__LOGOUT} from "./actions"

const initialState = {
    user: '',
    isLoading: false,
    errors: null,
}

export default (state = initialState, action) => {
    switch(action.type) {
        case GET_REGISTER__REQUEST: 
          return {
            ...state,
            isLoading: true,
          }
          case GET_REGISTER__SUCCESS: 
          return {
            ...state,
            isLoading: false,
            errors: null,
            user: action.payload,
          }
          case GET_REGISTER__FAILURE: 
          return {
            ...state,
            isLoading: false,
            errors: true,
            user: ''
          }
          case GET_REGISTER__LOGOUT: 
          return {
            ...state,
            isLoading: false,
            errors: false,
            user: ''
          }
        default: 
            return state
    }
}