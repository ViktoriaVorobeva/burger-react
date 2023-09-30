import React, { useState  } from "react";
import {
  Tab,
} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngridientsList from "../BurgerIngridientsList/BurgerIngridientsList";
import propTypes from 'prop-types';
import {ingridientPropTypes} from '../../utils/proptypes';

function sortIngridients(ingridients) {
    const bun = [];
    const main = [];
    const sauce = [];
    for (let ingridient of ingridients) {
        if (ingridient.type === 'bun') {
            bun.push(ingridient);
        } else if (ingridient.type === 'main') {
            main.push(ingridient);
        } else {
            sauce.push(ingridient);
        }
    }
    return [bun, main, sauce];
}

function BurgerIngridients({ingridients, getOpen}) {
  const [bun, main, sauce] = sortIngridients(ingridients);

  const [current, setCurrent] = React.useState("one");

  const setTab = (tab) => {
    setCurrent(tab);
    const element = document.getElementById(tab);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section style={{maxWidth: 600, maxHeight: 912, overflow: 'scroll'}}>
      <div className="mt-10 mb-10">
        <p className="text text_type_main-large mb-5">Соберите бургер</p>
        <div style={{ display: "flex" }} className="mb-10">
          <Tab value="one" active={current === "one"} onClick={setTab}>
            Булки
          </Tab>
          <Tab value="two" active={current === "two"} onClick={setTab}>
            Соусы
          </Tab>
          <Tab value="three" active={current === "three"} onClick={setTab}>
            Начинки
          </Tab>
        </div>
        <p id='one' className="text text_type_main-medium mb-6">Булки</p>
        {bun && <BurgerIngridientsList list={bun} getOpen={getOpen}/> }
        <p id='two' className="text text_type_main-medium mb-6">Соусы</p>
        {sauce && <BurgerIngridientsList list={sauce} getOpen={getOpen}/>}
        <p id='three' className="text text_type_main-medium mb-6">Начинки</p>
        {main && <BurgerIngridientsList list={main} getOpen={getOpen}/>}
      </div>
    </section>
  );
}

BurgerIngridients.propTypes = {
  ingridients: propTypes.arrayOf(ingridientPropTypes).isRequired,
  getOpen: propTypes.func.isRequired
};

export default BurgerIngridients;
