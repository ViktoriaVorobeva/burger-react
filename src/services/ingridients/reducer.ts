import { TIngridient } from "../../types/ingridient"
import { TUnionIngridientsActions } from "../interfaces"
import { GET_INGRIDIENTS__FAILURE, GET_INGRIDIENTS__REQUEST, GET_INGRIDIENTS__SUCCESS } from "./actions"

type TIngridientsState = {
  ingridients: TIngridient[],
  isLoading: boolean,
  errors: boolean | null,
}

const initialState: TIngridientsState = {
    ingridients: [],
    isLoading: false,
    errors: null,
}

export default (state: TIngridientsState = initialState, action: TUnionIngridientsActions) => {
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
            ingridients: action.payload.data
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