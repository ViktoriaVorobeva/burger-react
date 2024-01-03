import { nanoid } from "nanoid";
import { ADD_INGRIDIENT, DELETE_INGRIDIENT, SORT_INGRIDIENT } from "../constants";
import { IIngridientItem, IIngridientConstructor } from "../types";

export interface IGetAddIngridient {
    readonly type: typeof ADD_INGRIDIENT;
    readonly payload: IIngridientConstructor
}

export interface IGetDeleteIngridient {
    readonly type: typeof DELETE_INGRIDIENT;
    readonly payload: string
}

export interface IGetSortIngridient {
    readonly type: typeof SORT_INGRIDIENT;
    readonly payload: IIngridientConstructor[]
}

export type TConstructorActions =
  | IGetAddIngridient
  | IGetSortIngridient
  | IGetDeleteIngridient;

export const addIngridient = (item: IIngridientItem): IGetAddIngridient => {
    return {
        type: ADD_INGRIDIENT,
        payload: {
            ...item, 
           uniqueId: nanoid() 
        }
    }
}

export const deleteIngridient = (id: string): IGetDeleteIngridient => {
    return {
        type: DELETE_INGRIDIENT,
        payload: id
    }
}

export const sortIngridient = (list: IIngridientConstructor[]): IGetSortIngridient => {
    return {
        type: SORT_INGRIDIENT,
        payload: list
    }
}