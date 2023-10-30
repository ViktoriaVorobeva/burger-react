import React, { useEffect, useState, useCallback } from "react";
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
  SORT_INGRIDIENT,
} from "../../services/burgerConstructor/actions";
import { getOrdersData } from "../../services/orderDetails/actions";
import { ConstructorIngridient } from "../ConstructorIngridients/ConstructorIngridient";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.register);

  const dispatch = useDispatch();

  const moveCard = useCallback(
    (dragIndex, hoverIndex) => {
      const dragCard = constructor[dragIndex];
      const newCards = [...constructor];
      newCards.splice(dragIndex, 1);
      newCards.splice(hoverIndex, 0, dragCard);
      dispatch({ type: SORT_INGRIDIENT, payload: newCards });
    },
    [dispatch, constructor]
  );

  const createOrder = () => {
    if (!user) {
      navigate("/login?retpath=/");
    } else {
      getOpen(true);
      const order = constructor.map((ingridient) => ingridient.id);
      return dispatch(getOrdersData(order, bun));
    }
  };

  const [, dropTarget] = useDrop(
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
    const ids = constructor.map((ingridient) => ingridient.id);
    let sum = ids.reduce((acc, item) => {
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

  const createConstructorElement = (element, uniqueId, index) => {
    return (
      <ConstructorIngridient
        key={uniqueId}
        index={index}
        id={uniqueId}
        moveCard={moveCard}
      >
        <div className={burgerConstructorStyles.card_container}>
          <DragIcon type="primary" />
          <ConstructorElement
            text={element.name}
            price={element.price}
            thumbnail={element.image}
            handleClose={() => handleDelete(uniqueId)}
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
              : constructor.map(({ id, uniqueId }, index) => {
                  let ingr = findIngridient(ingridients, id);
                  if (ingr.type !== "bun") {
                    return createConstructorElement(ingr, uniqueId, index);
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
          {constructor.length > 0 && bun && (
            <Button
              onClick={(event) => createOrder(event)}
              htmlType="button"
              type="primary"
              size="large"
            >
              Оформить заказ
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}

BurgerConstructor.propTypes = {
  getOpen: propTypes.func.isRequired,
};

export default BurgerConstructor;
