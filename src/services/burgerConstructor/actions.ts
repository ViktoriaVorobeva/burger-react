import { nanoid } from "nanoid";
import { TConstructorIngridient } from "../../types/ingridient";
import { IGetConstructorAddAction } from "../interfaces";

export const ADD_INGRIDIENT = 'ADD_INGRIDIENT';
export const DELETE_INGRIDIENT = 'DELETE_INGRIDIENT';
export const CLEAR_CONSTRUCTOR = 'CLEAR_CONSTRUCTOR';
export const SORT_INGRIDIENT = 'SORT_INGRIDIENT';

export const addIngridient = (item: TConstructorIngridient): IGetConstructorAddAction => {
    return {
        type: ADD_INGRIDIENT,
        payload: {
            ...item, 
           uniqueId: nanoid() 
        }
    }
}
