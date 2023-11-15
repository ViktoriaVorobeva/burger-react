import { TIngridient } from "../types/ingridient";


export function findIngridient(ingridients: TIngridient[], id: string | undefined) {
    return ingridients.find((el) => el._id === id);
  }