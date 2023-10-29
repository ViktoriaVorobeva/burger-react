import { GET_INGRIDIENTS__FAILURE, GET_INGRIDIENTS__REQUEST, GET_INGRIDIENTS__SUCCESS } from "./actions"

const initialState = {
    ingridients: [],
    isLoading: false,
    errors: null,
    constructorIngridients: [],
}

export default (state = initialState, action) => {
    switch(action.type) {
        case GET_INGRIDIENTS__REQUEST: 
          return {
            ...state,
            isLoading: true,
          }
          case GET_INGRIDIENTS__SUCCESS: 
          return {
            ...state,
            isLoading: false,
            errors: null,
            ingridients: action.payload
          }
          case GET_INGRIDIENTS__FAILURE: 
          return {
            ...state,
            isLoading: false,
            errors: true,
            ingridients: []
          }
        default: 
            return state
    }
}