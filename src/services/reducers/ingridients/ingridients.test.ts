import {
  ingridientsReducer as reducer,
  initialStateIngridients as state,
} from "..";
import { getIngridientsSuccessAction } from "../../actions/ingridients";
import { ingredients } from "../../../utils/test-constants";

describe("ingredients reducer test", () => {
  it('should handle the initial state', () => {
    //@ts-ignore
    expect(reducer(undefined, {})).toEqual(state);
  })
  it("should handle get burger ingredients success", () => {
    expect(reducer(state, getIngridientsSuccessAction(ingredients))).toEqual({
      ingridients: ingredients,
      isLoading: false,
      errors: null,
    });
  });
});
