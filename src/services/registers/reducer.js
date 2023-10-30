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
  GET_LOGOUT__FAILURE
} from "./actions"

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
          case GET_LOGIN__REQUEST: 
          return {
            ...state,
            isLoading: true,
          }
          case GET_LOGIN__SUCCESS: 
          return {
            ...state,
            isLoading: false,
            errors: null,
            user: action.payload,
          }
          case GET_LOGIN__FAILURE: 
          return {
            ...state,
            isLoading: false,
            errors: true,
            user: ''
          }
          case GET_UPDATE__REQUEST: 
          return {
            ...state,
            isLoading: true,
          }
          case GET_UPDATE__SUCCESS: 
          return {
            ...state,
            isLoading: false,
            errors: null,
            user: action.payload,
          }
          case GET_UPDATE__FAILURE: 
          return {
            ...state,
            isLoading: false,
            errors: true,
            user: ''
          }
          case GET_LOGOUT__REQUEST: 
          return {
            ...state,
            isLoading: true,
          }
          case GET_LOGOUT__SUCCESS: 
          return {
            ...state,
            isLoading: false,
            errors: false,
            user: ''
          }
          case GET_LOGOUT__FAILURE: 
          return {
            ...state,
            isLoading: false,
            errors: true,
          }
        default: 
            return state
    }
}