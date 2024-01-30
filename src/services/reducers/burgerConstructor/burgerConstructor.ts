import { IGetConstructorClear, TConstructorActions } from "../../actions";
import {
  ADD_INGRIDIENT,
  DELETE_INGRIDIENT,
  SORT_INGRIDIENT,
  CLEAR_CONSTRUCTOR,
} from "../../constants";
import { IIngridientConstructor } from "../../types";

export type TConstructorState = {
  bun: boolean | string;
  constructorIngridients: IIngridientConstructor[];
};

export const initialStateConstructor: TConstructorState = {
  bun: false,
  constructorIngridients: [],
};

export const constructorReducer = (
  state = initialStateConstructor,
  action: TConstructorActions | IGetConstructorClear
): TConstructorState => {
  switch (action.type) {
    case ADD_INGRIDIENT:
      if (action.payload.type === "bun") {
        if (state.bun) {
          const newFilterIngridients = state.constructorIngridients.filter(
            ({ _id }) => _id !== state.bun
          );
          return {
            ...state,
            bun: action.payload._id,
            constructorIngridients: [...newFilterIngridients, action.payload],
          };
        }
        return {
          ...state,
          bun: action.payload._id,
          constructorIngridients: [
            ...state.constructorIngridients,
            action.payload,
          ],
        };
      } else {
        return {
          ...state,
          constructorIngridients: [
            ...state.constructorIngridients,
            action.payload,
          ],
        };
      }
    case DELETE_INGRIDIENT:
      const newFilterIngridients = state.constructorIngridients.filter(
        ({ uniqueId }) => uniqueId !== action.payload
      );
      return {
        ...state,
        constructorIngridients: newFilterIngridients,
      };
    case SORT_INGRIDIENT:
      return {
        ...state,
        constructorIngridients: action.payload,
      };
    case CLEAR_CONSTRUCTOR:
      return {
        ...state,
        constructorIngridients: [],
        bun: false,
      };
    default:
      return state;
  }
};
