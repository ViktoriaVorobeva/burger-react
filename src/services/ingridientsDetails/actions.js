export const OPEN_INGRIDIENT = 'OPEN_INGRIDIENT';
export const CLOSE_INGRIDIENT = 'CLOSE_INGRIDIENT';

export const setIngredientDetails = (element) => ({
    type: OPEN_INGRIDIENT,
    payload: element
  });
  
  export const deleteIngredientDetails = () => ({
    type: CLOSE_INGRIDIENT,
  });