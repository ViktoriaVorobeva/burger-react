import { TConstructorIngridient } from "../../types/ingridient";
import { TUnionConstructorActions } from "../interfaces";
import {
  ADD_INGRIDIENT,
  DELETE_INGRIDIENT,
  SORT_INGRIDIENT,
  CLEAR_CONSTRUCTOR
} from "./actions";

type TConstructorState = {
  bun: boolean | string;
  constructorIngridients: Array<TConstructorIngridient>
}

const initialState: TConstructorState = {
  bun: false,
  constructorIngridients: [],
}

export default (state:TConstructorState = initialState, action: TUnionConstructorActions) => {
  switch (action.type) {
    case ADD_INGRIDIENT:
      if (action.payload.type === 'bun') {
        if (state.bun) {
          const newFilterIngridients = state.constructorIngridients.filter(({
            id
          }) => id !== state.bun);
          return {
            ...state,
            bun: action.payload.id,
            constructorIngridients: [...newFilterIngridients, action.payload],
          }
        }
        return {
          ...state,
          bun: action.payload.id,
          constructorIngridients: [...state.constructorIngridients, action.payload],
        }
      } else {
        return {
          ...state,
          constructorIngridients: [...state.constructorIngridients, action.payload],
        }
      }
      case DELETE_INGRIDIENT:
        const newFilterIngridients = state.constructorIngridients.filter(({
          uniqueId
        }) => uniqueId !== action.payload);
        return {
          ...state,
          constructorIngridients: newFilterIngridients,
        }
        case SORT_INGRIDIENT:
          return {
            ...state,
            constructorIngridients: action.payload,
          }
          case CLEAR_CONSTRUCTOR:
            return {
              ...state,
              constructorIngridients: [],
                bun: false,
            }
            default:
              return state
  }
}