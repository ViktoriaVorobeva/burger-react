import React, { useEffect, useState, useCallback } from "react";
import update from 'immutability-helper';
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructorStyles from "./burger-constructor.module.css";
import propTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import {
  addIngridient,
  DELETE_INGRIDIENT,
} from "../../services/burgerConstructor/actions";
import {
  getOrdersData,
} from "../../services/orderDetails/actions";
import { ConstructorIngridient } from "../ConstructorIngridients/ConstructorIngridient";
import { BASE_URL } from "../../utils/url";

const ORDERDATA = `${BASE_URL}/orders`;

function findIngridient(ingridients, id) {
  return ingridients.find((el) => el._id === id);
}

function BurgerConstructor({ getOpen }) {
  const [totalPrice, setTotalPrice] = useState(0);
  const ingridients = useSelector((store) => store.ingridients.ingridients);
  const constructor = useSelector(
    (store) => store.burgerConstructor.constructorIngridients
  );
  const bun = useSelector((store) => store.burgerConstructor.bun);
  const keysConstructor = useSelector((store) => store.burgerConstructor.constructorKeys);
  const [cards, setCards] = useState(constructor);

  const moveCard = useCallback((dragIndex, hoverIndex) => {
    setCards((prevCards) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex]],
        ],
      }),
    )
  }, [])

  const dispatch = useDispatch();

  const createOrder = (e) => {
    return dispatch(getOrdersData(ORDERDATA, constructor, bun, getOpen, e))
  }

  const [{ isOver }, dropTarget] = useDrop(
    () => ({
      accept: "ingridient",
      drop: (item) => {
          dispatch(addIngridient(item));
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
    }),
    [dispatch]
  );

  const handleDelete = (id) => {
    dispatch({ type: DELETE_INGRIDIENT, payload: id });
  };

  useEffect(() => {
    let sum = constructor.reduce((acc, item) => {
      let element = findIngridient(ingridients, item);
      return acc + element.price;
    }, 0);
    if (bun) {
      let bunElement = findIngridient(ingridients, bun);
      sum += bunElement.price;
    }
    setTotalPrice(sum);
  }, [dispatch, constructor, ingridients, bun]);

  const initConstructor = (
    <ConstructorElement
      text="Добавьте ингридиенты"
      extraClass={burgerConstructorStyles.initial_constructor}
    />
  );

  const initTopBunConstructor = (
    <ConstructorElement
      type="top"
      text="Добавьте булки"
      extraClass={burgerConstructorStyles.initial_constructor}
    />
  );

  const initBottomBunConstructor = (
    <ConstructorElement
      type="bottom"
      text="Добавьте булки"
      extraClass={burgerConstructorStyles.initial_constructor}
    />
  );

  const createConstructorElement = (ingridient, idx) => {
    const element = findIngridient(ingridients, ingridient);
    const key = keysConstructor[idx];
    return (
      <ConstructorIngridient  key={key} index={idx} id={ingridient} moveCard={moveCard}>
        <div className={burgerConstructorStyles.card_container}>
          <DragIcon type="primary" />
          <ConstructorElement
            text={element.name}
            price={element.price}
            thumbnail={element.image}
            handleClose={() => handleDelete(ingridient)}
          />
        </div>
      </ConstructorIngridient>
    );
  };

  const createBunTopElement = (ingridient) => {
    const element = findIngridient(ingridients, ingridient);
    return (
      <div>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={`${element.name} (верх)`}
          price={element.price}
          thumbnail={element.image}
        />
      </div>
    );
  };

  const createBunBottomElement = (ingridient) => {
    const element = findIngridient(ingridients, ingridient);
    return (
      <div>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={`${element.name} (низ)`}
          price={element.price}
          thumbnail={element.image}
        />
      </div>
    );
  };

  return (
    <section className={burgerConstructorStyles.burger}>
      <div className="mt-25 mb-10 ml-4 mr-4">
        <div className="mb-10">
          <div
            ref={dropTarget}
            className={burgerConstructorStyles.constructor_list}
          >
            {bun ? createBunTopElement(bun) : initTopBunConstructor}
            {constructor.length === 0 || (constructor.length === 1 && bun)
              ? initConstructor
              : constructor.map((item, index) => {
                  let ingr = findIngridient(ingridients, item);
                  if (ingr.type !== "bun") {
                    return createConstructorElement(item, index);
                  }
                })}
            {bun ? createBunBottomElement(bun) : initBottomBunConstructor}
          </div>
        </div>
        <div className={burgerConstructorStyles.price}>
          <div className="mr-10">
            <div className={burgerConstructorStyles.price_container}>
              <p className="text text_type_main-large mr-2">{totalPrice}</p>
              <CurrencyIcon type="primary" />
            </div>
          </div>
          <Button
            onClick={(event) => createOrder(event)}
            htmlType="button"
            type="primary"
            size="large"
          >
            Оформить заказ
          </Button>
        </div>
      </div>
    </section>
  );
}

BurgerConstructor.propTypes = {
  getOpen: propTypes.func.isRequired,
};

export default BurgerConstructor;
