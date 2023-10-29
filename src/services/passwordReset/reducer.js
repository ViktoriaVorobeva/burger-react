import { GET_PASSWORD_RESET__REQUEST, GET_PASSWORD_RESET__SUCCESS, GET_PASSWORD_RESET__FAILURE} from "./actions"

const initialState = {
    email: '',
    isLoading: false,
    errors: null,
}

export default (state = initialState, action) => {
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
            order: []
          }
        default: 
            return state
    }
}