import React from "react";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerCardStyles from "./burger-card.module.css";
import propTypes from 'prop-types';
import {ingridientPropTypes} from '../../utils/proptypes';

function BurgerIngridientsCard({ card, id, getOpen }) {
  return (
    <li className={burgerCardStyles.card} onClick={(e) => getOpen(e, id)}>
      <div className="mb-1">
        <div className={burgerCardStyles.image_container}>
          <img src={card.image} alt={card.name} />
          <Counter count={1} size="default" extraClass="m-1" />
        </div>
      </div>
      <div className="mb-1">
        <div className={burgerCardStyles.price_container}>
          <p className="text text_type_digits-default mr-2">{card.price}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
      <div className={burgerCardStyles.title}>
      <p className="text text_type_main-small">{card.name}</p>
      </div>
    </li>
  );
}

BurgerIngridientsCard.propTypes = {
  card: ingridientPropTypes,
  id: propTypes.string.isRequired,
  getOpen: propTypes.func.isRequired
};

export default BurgerIngridientsCard;
