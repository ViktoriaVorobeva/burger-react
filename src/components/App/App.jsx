import React, { useState, useEffect } from "react";
import AppHeader from "../AppHeader/AppHeader";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngridients from "../BurgerIngredients/BurgerIngridients";
import IngridientsDetails from "../IngridientsDetails/IngridientsDetails";
import OrderDetails from "../OrderDetails/OrderDetails";
import appStyles from "./app.module.css";
import Modal from "../Modal/Modal";

const INGRIDIENTSDATA = "https://norma.nomoreparties.space/api/ingredients";

function findIngridient(ingridients, id) {
  return ingridients.find((el) => el._id === id);
}

function App() {
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showIngridientModal, setShowIngridientModal] = useState(false);
  const [ingridient, updateIngridient] = useState();

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
    updateIngridient(findIngridient(data, key));
  };

  const closeIngridientModal = (e) => {
    e.stopPropagation();
    setShowIngridientModal(false);
  };

  const handleError = () => {
    setState({
      ...state,
      isLoading: false,
      hasError: true,
    });
  };

  const [state, setState] = React.useState({
    isLoading: false,
    hasError: false,
    data: [],
  });

  React.useEffect(() => {
    const getIngridientsData = async () => {
      setState({
        ...state,
        isLoading: true,
        hasError: false,
      });

      try {
        const request = await fetch(INGRIDIENTSDATA);
        if (request.ok) {
          request
            .json()
            .then((data) => {
              setState({
                ...state,
                isLoading: false,
                hasError: false,
                data: data.data,
              });
            })
        } else {
          return Promise.reject(`Ошибка ${request.status}`);
        }
      } catch {
        handleError();
      }
    };
    getIngridientsData();
  }, []);

  const { isLoading, hasError, data } = state;

  return (
    <>
      <div>
        {isLoading && "Загрузка..."}
        {hasError && "Произошла ошибка"}
        {!isLoading && !hasError && (
          <>
            <AppHeader />
            <main className="container">
              <div className={appStyles.main_wrapper}>
                <BurgerIngridients
                  ingridients={data}
                  getOpen={openIngridientModal}
                />
                <BurgerConstructor getOpen={openOrderModal} />
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
