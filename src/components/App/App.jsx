import React, { useState, useEffect } from "react";
import AppHeader from "../AppHeader/AppHeader";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngridients from "../BurgerIngredients/BurgerIngridients";
import IngridientsDetails from "../IngridientsDetails/IngridientsDetails";
import OrderDetails from "../OrderDetails/OrderDetails";
import appStyles from "./app.module.css";
import Modal from "../Modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { getIngridientsData } from "../../services/ingridients/actions";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { BASE_URL } from "../../utils/url";

const INGRIDIENTSDATA = `${BASE_URL}/ingredients`;

function findIngridient(ingridients, id) {
  return ingridients.find((el) => el._id === id);
}

function App() {
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showIngridientModal, setShowIngridientModal] = useState(false);
  const [ingridient, updateIngridient] = useState();

  const dispatch = useDispatch();

  const openOrderModal = (e) => {
    e.stopPropagation();
    setShowOrderModal(true);
  };

  const closeOrderModal = (e) => {
    e.stopPropagation();
    setShowOrderModal(false);
  };

  const openIngridientModal = (e, key) => {
    e.stopPropagation();
    setShowIngridientModal(true);
    updateIngridient(findIngridient(ingridients, key));
  };

  const closeIngridientModal = (e) => {
    e.stopPropagation();
    setShowIngridientModal(false);
  };

  useEffect(() => {
    dispatch(getIngridientsData(INGRIDIENTSDATA));
  }, [dispatch]);

  const { isLoading, errors, ingridients } = useSelector(
    (state) => state.ingridients
  );

  return (
    <>
      <div>
        {isLoading && "Загрузка..."}
        {errors && "Произошла ошибка"}
        {!isLoading && !errors && (
          <>
            <AppHeader />
            <main className="container">
              <div className={appStyles.main_wrapper}>
                <DndProvider backend={HTML5Backend}>
                  <BurgerIngridients getOpen={openIngridientModal} />
                  <BurgerConstructor getOpen={openOrderModal} />
                </DndProvider>
              </div>
            </main>
          </>
        )}
      </div>
      {showOrderModal && (
        <Modal getClose={closeOrderModal}>
          <OrderDetails />
        </Modal>
      )}
      {showIngridientModal && (
        <Modal title="Детали ингридиента" getClose={closeIngridientModal}>
          <IngridientsDetails ingridient={ingridient} />
        </Modal>
      )}
    </>
  );
}

export default App;
