import React, { useEffect } from "react";
import { Routes, Route, useLocation, Location } from "react-router-dom";
import HomePage from "../../pages/home/home";
import { LoginPage } from "../../pages/login/login";
import { RegisterPage } from "../../pages/register/register";
import { ForgotPage } from "../../pages/forgotPassword/forgot";
import { ResetPage } from "../../pages/resetPassword/reset";
import { IngridientPage } from "../../pages/ingridient/ingridient";
import AppHeader from "../AppHeader/AppHeader";
import { ProfilePage } from "../../pages/profile/profile";
import { ProtectedRouteElement } from "../ProtectedRouteElement/ProtectedRouteElement";
import IngridientsDetails from "../IngridientsDetails/IngridientsDetails";
import Modal from "../Modal/Modal";
import { useDispatch } from "../../types/hooks";
import { getIngridientsData } from "../../services/ingridients/actions";
import {
  GET_REGISTER__FAILURE,
  GET_REGISTER__REQUEST,
  GET_REGISTER__SUCCESS,
} from "../../services/registers/actions";
import { TUserResponce, fetchWithRefresh } from "../../utils/fetchWithRefresh";
import { FeedPage } from "../../pages/feedPage/feedPage";
import { Order } from "../Order/Order";
import { OrderUser } from "../OrderUser/OrderUser";
import { OrderInfo } from "../../pages/orderInfo/OrderIfo";
import { ProfileOrderInfo } from "../../pages/profileOrderInfo/profileOrderInfo";
import { UpdateProfileForm } from "../UpdateProfileForm/UpdateProfileForm";
import { OrderHistory } from "../OrderHistory/OrderHistory";

function App() {
  let location = useLocation();
  const dispatch = useDispatch();

  const locationState = location.state as { backgroundLocation: Location };

  const background = locationState && locationState.backgroundLocation;
  useEffect(() => {
    dispatch(getIngridientsData());
  }, [dispatch]);
  useEffect(() => {
    dispatch({
      type: GET_REGISTER__REQUEST,
    });
    fetchWithRefresh<TUserResponce>()
      .then((data) => {
        dispatch({
          type: GET_REGISTER__SUCCESS,
          payload: data?.user,
        });
      })
      .catch(() => {
        dispatch({
          type: GET_REGISTER__FAILURE,
        });
      });
  }, [dispatch]);

  return (
    <>
      <AppHeader />
      <Routes location={background || location}>
        <Route path="/" element={<HomePage />} />
        <Route path="/feed" element={<FeedPage />} />
        <Route path="/feed/:id" element={<OrderInfo />} />
        <Route
          path="/login"
          element={
            <ProtectedRouteElement onlyUnAuth={true}>
              <LoginPage />
            </ProtectedRouteElement>
          }
        />
        <Route
          path="/register"
          element={
            <ProtectedRouteElement onlyUnAuth={true}>
              <RegisterPage />
            </ProtectedRouteElement>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <ProtectedRouteElement onlyUnAuth={true}>
              <ForgotPage />
            </ProtectedRouteElement>
          }
        />
        <Route
          path="/reset-password"
          element={
            <ProtectedRouteElement onlyUnAuth={true}>
              <ResetPage />
            </ProtectedRouteElement>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRouteElement>
              <ProfilePage />
            </ProtectedRouteElement>
          }
        >
          <Route path="/profile" element={<UpdateProfileForm />} />
          <Route path="/profile/orders" element={<OrderHistory />} />
        </Route>
        <Route
          path="/profile/orders/:id"
          element={
            <ProtectedRouteElement>
              <ProfileOrderInfo />
            </ProtectedRouteElement>
          }
        />
        <Route path="/ingredients/:id" element={<IngridientPage />} />
      </Routes>
      {!!background && (
        <Routes>
          <Route
            path="/ingredients/:id"
            element={
              <Modal title="Детали ингридиента">
                <IngridientsDetails />
              </Modal>
            }
          ></Route>
          <Route path="/feed/:id">
            <Modal>
              <Order />
            </Modal>
          </Route>
          <Route path="/profile/orders/:id">
            <Modal>
              <OrderUser />
            </Modal>
          </Route>
        </Routes>
      )}
    </>
  );
}

export default App;
