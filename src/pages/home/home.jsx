import React, { useState, useEffect } from "react";
import appStyles from "./home.module.css";
import { useDispatch, useSelector } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { BASE_URL } from "../../utils/url";
import { getIngridientsData } from "../../services/ingridients/actions";
import BurgerIngridients from "../../components/BurgerIngredients/BurgerIngridients";
import BurgerConstructor from "../../components/BurgerConstructor/BurgerConstructor";
import Modal from "../../components/Modal/Modal";
import OrderDetails from "../../components/OrderDetails/OrderDetails";
import { GET_REGISTER__FAILURE, GET_REGISTER__REQUEST, GET_REGISTER__SUCCESS } from "../../services/registers/actions";
import { getCookie } from "../../utils/cookie";
import { fetchWithRefresh } from "../../utils/fetchWithRefresh";

const INGRIDIENTSDATA = `${BASE_URL}/ingredients`;
const USERDATA = `${BASE_URL}/auth/user`;

function HomePage() {
  const [showOrderModal, setShowOrderModal] = useState(false);

  const dispatch = useDispatch();

  const openOrderModal = (e) => {
    e.stopPropagation();
    setShowOrderModal(true);
  };

  const closeOrderModal = (e) => {
    e.stopPropagation();
    setShowOrderModal(false);
  };

  useEffect(() => {
    dispatch(getIngridientsData(INGRIDIENTSDATA));
  }, [dispatch]);

  useEffect(() => {
    dispatch({
      type: GET_REGISTER__REQUEST,
  });
  fetchWithRefresh(USERDATA, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        "Authorization": 'Bearer ' + getCookie('token')
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer'
    })
    .then((data) => {
      dispatch({
          type: GET_REGISTER__SUCCESS,
          payload: data.user,
      });
  })
  .catch(() => {
      dispatch({
          type: GET_REGISTER__FAILURE,
      })
  })
  }, [dispatch]);

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
        <Modal>
          <OrderDetails />
        </Modal>
      )}
    </>
  );
}

export default HomePage;
