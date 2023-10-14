import { ADD_INGRIDIENT, DELETE_INGRIDIENT, CLEAR_CONSTRUCTOR } from "./actions";

const initialState = {
    bun: false, 
    constructorIngridients: [],
}

export default (state = initialState, action) => {
    switch(action.type) {
          case ADD_INGRIDIENT: 
            if (action.payload.type === 'bun') {
              if (state.bun) {
                const newFilterIngridients = state.constructorIngridients.filter((item) => item !== state.bun);
                return {
                  ...state,
                  bun: action.payload.id,
                  constructorIngridients: [...newFilterIngridients, action.payload.id]
                }
              }
              return {
                ...state,
                bun: action.payload.id,
                constructorIngridients: [...state.constructorIngridients, action.payload.id]
              }
            } else {
              if (!action.payload.type) {
                const newFilterIngridients = state.constructorIngridients;
                const hoverableIngridient = newFilterIngridients[action.payload.index];
                let temp = hoverableIngridient;
                const changeIngridient = newFilterIngridients.indexOf(action.payload.id);
                newFilterIngridients[action.payload.index] = newFilterIngridients[changeIngridient];
                newFilterIngridients[changeIngridient] = temp;
                return {
                  ...state,
                constructorIngridients: [...newFilterIngridients]
                }
              }
              return {
                ...state,
                constructorIngridients: [...state.constructorIngridients, action.payload.id]
              }
            }
          case DELETE_INGRIDIENT: 
          const deletedIndex = state.constructorIngridients.indexOf(action.payload)
          const newConstructorState = [...state.constructorIngridients];
          newConstructorState.splice(deletedIndex, 1)
          return {
            ...state,
            constructorIngridients: newConstructorState
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