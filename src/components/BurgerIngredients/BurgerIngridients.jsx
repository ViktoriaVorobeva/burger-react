import React, { useEffect, useState } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngridientsList from "../BurgerIngridientsList/BurgerIngridientsList";
import propTypes from "prop-types";
import burgerIngridientsStyles from "./burger-ingridients.module.css";
import { useSelector } from "react-redux";
import { useInView } from "react-intersection-observer";

function sortIngridients(ingridients) {
  const bun = [];
  const main = [];
  const sauce = [];
  for (let ingridient of ingridients) {
    if (ingridient.type === "bun") {
      bun.push(ingridient);
    } else if (ingridient.type === "main") {
      main.push(ingridient);
    } else {
      sauce.push(ingridient);
    }
  }
  return [bun, main, sauce];
}

function BurgerIngridients() {
  const ingridients = useSelector((state) => state.ingridients.ingridients);
  const [bun, main, sauce] = sortIngridients(ingridients);

  const [bunRef, bunInView] = useInView({
    threshold: 0,
  });
  const [mainRef, mainInView] = useInView({
    threshold: 0,
  });
  const [sauceRef, sauceInView] = useInView({
    threshold: 0,
  });

  const [current, setCurrent] = React.useState("one");

  const setTab = (tab) => {
    setCurrent(tab);
    const element = document.getElementById(tab);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (bunInView) {
      setCurrent("one");
    }
  }, [bunInView]);

  useEffect(() => {
    if (sauceInView) {
      setCurrent("two");
    }
  }, [sauceInView]);

  useEffect(() => {
    if (mainInView) {
      setCurrent("three");
    }
  }, [mainInView]);

  return (
    <section>
      <div className="mt-10 mb-10">
        <p className="text text_type_main-large mb-5">Соберите бургер</p>
        <div className="mb-10">
          <div className={burgerIngridientsStyles.tabs}>
            <Tab value="one" active={current === "one"} onClick={setTab}>
              <p className="text text_type_main-default">
                Булки
              </p>
            </Tab>
            <Tab value="two" active={current === "two"} onClick={setTab}>
              <p className="text text_type_main-default">
                Соусы
              </p>
            </Tab>
            <Tab value="three" active={current === "three"} onClick={setTab}>
              <p className="text text_type_main-default">
                Начинки
              </p>
            </Tab>
          </div>
        </div>
        <div className={burgerIngridientsStyles.burger}>
          <p id="one" className="text text_type_main-medium mb-6" ref={bunRef}>
            Булки
          </p>
          {bun && <BurgerIngridientsList list={bun}  />}
          <p id="two" className="text text_type_main-medium mb-6" ref={sauceRef}>
            Соусы
          </p>
          {sauce && <BurgerIngridientsList list={sauce}  />}
          <p id="three" className="text text_type_main-medium mb-6" ref={mainRef}>
            Начинки
          </p>
          {main && <BurgerIngridientsList list={main}  />}
        </div>
      </div>
    </section>
  );
}

export default BurgerIngridients;
