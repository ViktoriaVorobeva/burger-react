import React, { useState, useEffect } from "react";
import AppHeader from "./components/AppHeader/AppHeader";
import BurgerConstructor from "./components/BurgerConstructor/BurgerConstructor";
import BurgerIngridients from "./components/BurgerIngredients/BurgerIngridients";
import IngridientsDetails from "./components/IngridientsDetails/IngridientsDetails";
import OrderDetails from "./components/OrderDetails/OrderDetails";

const INGRIDIENTSDATA = "https://norma.nomoreparties.space/api/ingredients";

function findIngridient(ingridients, id) {
  return ingridients.find((el) => el._id === id)
}

function App() {
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showIngridientModal, setShowIngridientModal] = useState(false);
  const [ingridient, updateIngridient] = useState();

  const openOrderModal = (e) => {
    e.stopPropagation();
    setShowOrderModal(true);
  }

  const closeOrderModal = (e) => {
    e.stopPropagation();
    setShowOrderModal(false);
  }

  const openIngridientModal = (e, key) => {
    e.stopPropagation();
    setShowIngridientModal(true);
    updateIngridient(findIngridient(data, key));
  }

  const closeIngridientModal = (e) => {
    e.stopPropagation();
    setShowIngridientModal(false);
  }

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

      await fetch(INGRIDIENTSDATA)
        .then((res) => res.json())
        .then((data) => {
          setState({
            ...state,
            isLoading: false,
            hasError: false,
            data: data.data,
          });
        })
        .catch((e) =>
          setState({
            ...state,
            isLoading: false,
            hasError: true,
          })
        );
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
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "600px 600px",
                  gap: 40,
                }}
              >
                <BurgerIngridients ingridients={data} getOpen={openIngridientModal}/>
                <BurgerConstructor  getOpen={openOrderModal}/>
              </div>
            </main>
          </>
        )}
      </div>
      <OrderDetails getClose={closeOrderModal} isOpen={showOrderModal}/>
      <IngridientsDetails ingridient={ingridient} getClose={closeIngridientModal} isOpen={showIngridientModal}/>
    </>
  );
}

export default App;
