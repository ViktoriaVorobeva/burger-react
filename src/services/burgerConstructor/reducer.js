import {
  ADD_INGRIDIENT,
  DELETE_INGRIDIENT,
  CLEAR_CONSTRUCTOR
} from "./actions";

const initialState = {
  bun: false,
  constructorIngridients: [],
  constructorKeys: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_INGRIDIENT:
      if (action.payload.type === 'bun') {
        if (state.bun) {
          const neededIdx = state.constructorIngridients.indexOf(state.bun);
          const newFilterIngridients = state.constructorIngridients.filter((item) => item !== state.bun);
          const newConstructorAddedKeys = state.constructorKeys;
          newConstructorAddedKeys.splice(neededIdx, 1);
          newConstructorAddedKeys.push(action.payload.uniqueId)
          return {
            ...state,
            bun: action.payload.id,
            constructorIngridients: [...newFilterIngridients, action.payload.id],
            constructorKeys: newConstructorAddedKeys
          }
        }
        return {
          ...state,
          bun: action.payload.id,
          constructorIngridients: [...state.constructorIngridients, action.payload.id],
          constructorKeys: [...state.constructorKeys, action.payload.uniqueId]
        }
      } else {
        if (!action.payload.type) {
          const newFilterIngridients = state.constructorIngridients;
          const newConstructorAddedKeys = state.constructorKeys;

          const hoverableKey = newConstructorAddedKeys[action.payload.index];
          let tempKey = hoverableKey;
          const changeKey = newFilterIngridients.indexOf(action.payload.id);
          newConstructorAddedKeys[action.payload.index] = newConstructorAddedKeys[changeKey];
          newConstructorAddedKeys[changeKey] = tempKey;

          const hoverableIngridient = newFilterIngridients[action.payload.index];
          let temp = hoverableIngridient;
          const changeIngridient = newFilterIngridients.indexOf(action.payload.id);
          newFilterIngridients[action.payload.index] = newFilterIngridients[changeIngridient];
          newFilterIngridients[changeIngridient] = temp;
          return {
            ...state,
            constructorIngridients: [...newFilterIngridients],
            constructorKeys: [...newConstructorAddedKeys]
          }
        }
        return {
          ...state,
          constructorIngridients: [...state.constructorIngridients, action.payload.id],
          constructorKeys: [...state.constructorKeys, action.payload.uniqueId]
        }
      }
      case DELETE_INGRIDIENT:
        const deletedIndex = state.constructorIngridients.indexOf(action.payload)
        const newConstructorDeletedKeys = state.constructorKeys.delete(action.payload);
        const newConstructorState = [...state.constructorIngridients];
        newConstructorState.splice(deletedIndex, 1)
        return {
          ...state,
          constructorIngridients: newConstructorState,
          constructorKeys: newConstructorDeletedKeys,
        }
        case CLEAR_CONSTRUCTOR:
          return {
            ...state,
            constructorIngridients: [],
              bun: false,
              constructorKeys: [],
          }
          default:
            return state
  }
}