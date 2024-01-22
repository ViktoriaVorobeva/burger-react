import {
  constructorReducer as reducer,
  initialStateConstructor as state,
} from "../reducers";
import {
  addIngridient,
  deleteIngridient,
  sortIngridient,
} from "../actions/burgerConstructor";
import {
  fluorescentBun,
  craterBun,
  ingredientSauce,
  ingredientMain,
} from "../../utils/test-constants";

describe("burger-constructor reducer test", () => {
  it("should handle add bun", () => {
    expect(reducer(state, addIngridient(fluorescentBun))).toEqual({
      ...state,
      bun: fluorescentBun._id,
      constructorIngridients: [fluorescentBun],
    });
  });
  it("should handle replace bun", () => {
    expect(
      reducer(
        {
          ...state,
          bun: fluorescentBun._id,
          constructorIngridients: [fluorescentBun],
        },
        addIngridient(craterBun)
      )
    ).toEqual({
      ...state,
      bun: craterBun._id,
      constructorIngridients: [craterBun],
    });
  });
  it("should handle add ingredient", () => {
    expect(reducer(state, addIngridient(ingredientSauce))).toEqual({
      ...state,
      bun: false,
      constructorIngridients: [ingredientSauce],
    });
  });
  it("should handle add another ingredient", () => {
    expect(
      reducer(
        { ...state, constructorIngridients: [ingredientSauce] },
        addIngridient(ingredientMain)
      )
    ).toEqual({
      ...state,
      constructorIngridients: [ingredientSauce, ingredientMain],
    });
  });
  it("should handle move ingredient", () => {
    expect(
      reducer(
        {
          ...state,
          constructorIngridients: [ingredientSauce, ingredientSauce, ingredientMain],
        },
        sortIngridient([ingredientSauce, ingredientMain, ingredientSauce])
      )
    ).toEqual({
      ...state,
      constructorIngridients: [ingredientSauce, ingredientMain, ingredientSauce],
    });
  });
  it("should handle delete ingredient", () => {
    expect(
      reducer(
        { ...state, constructorIngridients: [ingredientSauce, ingredientMain] },
        deleteIngridient(ingredientMain.uniqueId)
      )
    ).toEqual({
      ...state,
      constructorIngridients: [ingredientSauce],
    });
  });
});
