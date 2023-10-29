import { OPEN_INGRIDIENT, CLOSE_INGRIDIENT } from "./actions"

const initialState = {
    ingridient: null
}

export default (state = initialState, action) => {
    switch(action.type) {
        case OPEN_INGRIDIENT: 
          return {
            ...state,
            ingridient: action.payload,
          }
          case CLOSE_INGRIDIENT: 
          return {
            ...state,
            ingridient: null,
          }
        default: 
            return state
    }
}