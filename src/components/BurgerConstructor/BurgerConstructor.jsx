import React from "react";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
  DragIcon
} from "@ya.praktikum/react-developer-burger-ui-components";
import { data } from "../../utils/data";
import burgerConstructorStyles from "./burger-constructor.module.css";
import propTypes from 'prop-types';

function BurgerConstructor({getOpen}) {
  return (
    <section className={burgerConstructorStyles.burger}>
      <div className="mt-25 mb-10 ml-4 mr-4">
        <div className='mb-10'>
          <div className={burgerConstructorStyles.constructor_list }>
          <ConstructorElement
            type="top"
            isLocked={true}
            text="Краторная булка N-200i (верх)"
            price={200}
            thumbnail={data[0].image}
          />
          <div className={burgerConstructorStyles.card_container }>
          <DragIcon type="primary" />
          <ConstructorElement
            text="Говяжий метеорит (отбивная)"
            price={3000}
            thumbnail={data[1].image}
          />
          </div>
          <div className={burgerConstructorStyles.card_container }>
          <DragIcon type="primary" />
          <ConstructorElement
            text="Соус Spicy-X"
            price={90}
            thumbnail={data[3].image}
          />
          </div>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text="Краторная булка N-200i (низ)"
            price={200}
            thumbnail={data[0].image}
          />
          </div>
        </div>
        <div className={burgerConstructorStyles.price }>
          <div className='mr-10'>
            <div className={burgerConstructorStyles.price_container }>
            <p className="text text_type_main-large mr-2">3490</p>
            <CurrencyIcon type="primary" />
            </div>
          </div>
          <Button onClick={getOpen} htmlType="button" type="primary" size="large">
            Оформить заказ
          </Button>
        </div>
      </div>
    </section>
  );
}

BurgerConstructor.propTypes = {
  getOpen: propTypes.func.isRequired
};

export default BurgerConstructor;
