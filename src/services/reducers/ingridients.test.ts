import {
  ingridientsReducer as reducer,
  initialStateIngridients as state,
} from "../reducers";
import { getIngridientsSuccessAction } from "../actions/ingridients";
import { ingredients } from "../../utils/test-constants";

describe("ingredients reducer test", () => {
  it("should handle get burger ingredients success", () => {
    expect(reducer(state, getIngridientsSuccessAction(ingredients))).toEqual({
      ingridients: ingredients,
      isLoading: false,
      errors: null,
    });
  });
});
