import { TIngridient } from "../../../types/ingridient";
import { TIngridientsActions } from "../../actions";
import { GET_INGRIDIENTS__FAILURE, GET_INGRIDIENTS__REQUEST, GET_INGRIDIENTS__SUCCESS } from "../../constants"

export type TIngridientsState = {
  ingridients: TIngridient[],
  isLoading: boolean,
  errors: null | boolean,
};

export const initialStateIngridients: TIngridientsState = {
    ingridients: [],
    isLoading: false,
    errors: null,
}

export const ingridientsReducer = (state = initialStateIngridients, action: TIngridientsActions): TIngridientsState => {
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