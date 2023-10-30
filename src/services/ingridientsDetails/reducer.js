import {
  OPEN_INGRIDIENT,
  CLOSE_INGRIDIENT,
} from './actions';

export const initialState = {
  ingredientDetails: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case OPEN_INGRIDIENT: {
      return {
        ...state,
        ingredientDetails: action.payload
      }
    }
    case CLOSE_INGRIDIENT: {
      return {
        ...state,
        ingredientDetails: null
      }
    }
    default: {
      return state
    }
  }
}