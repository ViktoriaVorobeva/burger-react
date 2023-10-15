import { nanoid } from "nanoid";

export const ADD_INGRIDIENT = 'ADD_INGRIDIENT';
export const DELETE_INGRIDIENT = 'DELETE_INGRIDIENT';
export const CLEAR_CONSTRUCTOR = 'CLEAR_CONSTRUCTOR';

export const addIngridient = (item) => {
    return {
        type: ADD_INGRIDIENT,
        payload: {
            ...item, 
           uniqueId: nanoid() 
        }
    }
}
