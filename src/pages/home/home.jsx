import React, { useState } from "react";
import appStyles from "./home.module.css";
import { useSelector } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BurgerIngridients from "../../components/BurgerIngredients/BurgerIngridients";
import BurgerConstructor from "../../components/BurgerConstructor/BurgerConstructor";
import Modal from "../../components/Modal/Modal";
import OrderDetails from "../../components/OrderDetails/OrderDetails";

function HomePage() {
  const [showOrderModal, setShowOrderModal] = useState(false);

  const openOrderModal = () => {
    setShowOrderModal(true);
  };

  const closeOrderModal = () => {
    setShowOrderModal(false);
  };

  const { isLoading, errors } = useSelector(
    (state) => state.ingridients
  );

  return (
    <>
      <div>
        {isLoading && "Загрузка..."}
        {errors && "Произошла ошибка"}
        {!isLoading && !errors && (
          <>
            <main className="container">
              <div className={appStyles.main_wrapper}>
                <DndProvider backend={HTML5Backend}>
                  <BurgerIngridients />
                  <BurgerConstructor getOpen={openOrderModal} />
                </DndProvider>
              </div>
            </main>
          </>
        )}
      </div>
      {showOrderModal && (
        <Modal onClose={closeOrderModal}>
          <OrderDetails />
        </Modal>
      )}
    </>
  );
}

export default HomePage;
