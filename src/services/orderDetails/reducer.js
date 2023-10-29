import { GET_ORDER__REQUEST, GET_ORDER__FAILURE, GET_ORDER__SUCCESS} from "./actions"

const initialState = {
    order: [],
    isLoading: false,
    errors: null,
}

export default (state = initialState, action) => {
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
            order: []
          }
        default: 
            return state
    }
}