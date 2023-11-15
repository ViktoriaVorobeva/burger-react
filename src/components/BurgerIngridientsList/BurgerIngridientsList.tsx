import React from 'react';
import BurgerIngridientsCard from '../BurgerIngridientsCard/BurgerIngridientsCard';
import burgerListStyles from './burger-list.module.css';
import { TIngridient } from '../../types/ingridient';

type TList = {
  list: TIngridient[]
}

const BurgerIngridientsList: React.FC<TList> = ({list}) => {
    return (
        <div className="mb-10 ml-4 mr-4">
          <ul className={burgerListStyles.list}>
            {list && list.map(ingridient => <BurgerIngridientsCard card={ingridient} id={ingridient._id} key={ingridient._id}/>)}
          </ul>
        </div>
  );
}

export default BurgerIngridientsList;