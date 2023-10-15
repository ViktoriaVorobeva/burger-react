import React from 'react';
import BurgerIngridientsCard from '../BurgerIngridientsCard/BurgerIngridientsCard';
import burgerListStyles from './burger-list.module.css';
import propTypes from 'prop-types';
import {ingridientPropTypes} from '../../utils/proptypes';

function BurgerIngridientsList({list, getOpen}) {
    return (
        <div className="mb-10 ml-4 mr-4">
          <ul className={burgerListStyles.list}>
            {list && list.map(ingridient => <BurgerIngridientsCard card={ingridient} id={ingridient._id} key={ingridient._id} getOpen={getOpen}/>)}
          </ul>
        </div>
  );
}

BurgerIngridientsList.propTypes = {
  list: propTypes.arrayOf(ingridientPropTypes).isRequired,
  getOpen: propTypes.func.isRequired
};

export default BurgerIngridientsList;