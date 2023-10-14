import React, { useState, useEffect } from "react";
import AppHeader from "../AppHeader/AppHeader";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngridients from "../BurgerIngredients/BurgerIngridients";
import IngridientsDetails from "../IngridientsDetails/IngridientsDetails";
import OrderDetails from "../OrderDetails/OrderDetails";
import appStyles from "./app.module.css";
import Modal from "../Modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import {
  GET_INGRIDIENTS__FAILURE,
  GET_INGRIDIENTS__REQUEST,
  GET_INGRIDIENTS__SUCCESS,
} from "../../services/ingridients/actions";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const INGRIDIENTSDATA = "https://norma.nomoreparties.space/api/ingredients";

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
    const getIngridientsData = async () => {
      dispatch({
        type: GET_INGRIDIENTS__REQUEST,
      });

      try {
        const request = await fetch(INGRIDIENTSDATA);
        if (request.ok) {
          request.json().then((data) => {
            dispatch({
              type: GET_INGRIDIENTS__SUCCESS,
              payload: data.data,
            });
          });
        } else {
          dispatch({
            type: GET_INGRIDIENTS__FAILURE,
          });
        }
      } catch {
        dispatch({
          type: GET_INGRIDIENTS__FAILURE,
        });
      }
    };
    getIngridientsData();
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
