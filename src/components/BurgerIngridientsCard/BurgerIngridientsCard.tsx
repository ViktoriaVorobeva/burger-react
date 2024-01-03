import React, { useEffect, useState } from "react";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerCardStyles from "./burger-card.module.css";
import { useDrag } from "react-dnd";
import { Link, useLocation } from "react-router-dom";
import { TIngridient } from '../../types/ingridient';
import { useSelector } from "../../services/hooks";

type TCard = {
  card: TIngridient,
  id: string
}

const BurgerIngridientsCard: React.FC<TCard> = ({ card, id }) => {
  let location = useLocation();
  const constructor = useSelector(
    (store) => store.burgerConstructor.constructorIngridients
  );

  const [count, setCount] = useState(0);
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
      let total = 0;
      for (let el of constructor) {
        if (el.id === id) {
          total++;
        }
      }
      setCount(total);
  }, [isDragging, constructor, id]);

  return (
    <li
      ref={dragRef}
    >
      <Link className={burgerCardStyles.card} to={`/ingredients/${id}`}
            state={{ backgroundLocation: location }}>
        <div className="mb-1">
          <div className={burgerCardStyles.image_container}>
            <img src={card.image} alt={card.name} />
            {count !== 0 && <Counter count={count} size="default" extraClass="m-1" />}
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
      </Link>
    </li>
  );
}

export default BurgerIngridientsCard;
