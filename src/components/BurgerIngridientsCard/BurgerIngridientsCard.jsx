import React, { useEffect, useState } from "react";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerCardStyles from "./burger-card.module.css";
import propTypes from "prop-types";
import { ingridientPropTypes } from "../../utils/proptypes";
import { useDrag } from "react-dnd";
import { useSelector } from "react-redux";

function BurgerIngridientsCard({ card, id, getOpen }) {
  const constructor = useSelector(
    (store) => store.burgerConstructor.constructorIngridients
  );
  
  const [count, setCount] = useState(null);
  const [{ isDragging }, dragRef] = useDrag(
    () => ({
      type: "ingridient",
      item: { id: id, type: card.type },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    []
  );

  useEffect(() => {
    if (dragRef) {
      let total = null;
      for (let el of constructor) {
        if (el === id) {
          total++;
        }
      }
      setCount(total);
    }
  }, [isDragging, constructor, dragRef, id]);

  return (
    <li
      className={burgerCardStyles.card}
      onClick={(e) => getOpen(e, id)}
      ref={dragRef}
    >
      <div className="mb-1">
        <div className={burgerCardStyles.image_container}>
          <img src={card.image} alt={card.name} />
          {count && <Counter count={count} size="default" extraClass="m-1" />}
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
  getOpen: propTypes.func.isRequired,
};

export default BurgerIngridientsCard;
