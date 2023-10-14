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
  ADD_INGRIDIENT,
  DELETE_INGRIDIENT,
  CLEAR_CONSTRUCTOR,
} from "../../services/burgerConstructor/actions";
import {
  GET_ORDER__REQUEST,
  GET_ORDER__SUCCESS,
  GET_ORDER__FAILURE,
} from "../../services/orderDetails/actions";
import { nanoid } from "nanoid";
import { ConstructorIngridient } from "../ConstructorIngridients/ConstructorIngridient";

const ORDERDATA = "https://norma.nomoreparties.space/api/orders";

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

  const getOrdersData = async (event) => {
    if (bun) {
      dispatch({
        type: GET_ORDER__REQUEST,
      });

      try {
        const request = await fetch(ORDERDATA, {
          method: "POST",
          body: JSON.stringify({ ingredients: constructor.concat(bun) }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });
        if (request.ok) {
          request.json().then((data) => {
            dispatch({
              type: GET_ORDER__SUCCESS,
              payload: data.order.number,
            });
            dispatch({
              type: CLEAR_CONSTRUCTOR,
            });
            getOpen(event);
          });
        } else {
          dispatch({
            type: GET_ORDER__FAILURE,
          });
        }
      } catch {
        dispatch({
          type: GET_ORDER__FAILURE,
        });
      }
    }
  };

  const [{ isOver }, dropTarget] = useDrop(
    () => ({
      accept: "ingridient",
      drop: (item) => {
          dispatch({ type: ADD_INGRIDIENT, payload: item });
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
    const key = nanoid();
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
      <div key={nanoid()}>
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
      <div key={nanoid()}>
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
                  let decrement = 0;
                  if (ingr.type !== "bun") {
                    return createConstructorElement(item, index - decrement);
                  } else {
                    decrement++;
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
            onClick={getOrdersData}
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
