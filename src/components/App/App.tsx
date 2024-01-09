import React, { useEffect, useState } from "react";
import {
  Routes,
  Route,
  useLocation,
  Location,
  useNavigate,
} from "react-router-dom";
import HomePage from "../../pages/home/home";
import { LoginPage } from "../../pages/login/login";
import { RegisterPage } from "../../pages/register/register";
import { ForgotPage } from "../../pages/forgotPassword/forgot";
import { ResetPage } from "../../pages/resetPassword/reset";
import AppHeader from "../AppHeader/AppHeader";
import { ProfilePage } from "../../pages/profile/profile";
import { ProtectedRouteElement } from "../ProtectedRouteElement/ProtectedRouteElement";
import IngridientsDetails from "../IngridientsDetails/IngridientsDetails";
import Modal from "../Modal/Modal";
import {
  getIngridientsData,
  getRegisterAction,
  getRegisterFailureAction,
  getRegisterSuccessAction,
} from "../../services/actions";
import { TUserResponce, fetchWithRefresh } from "../../utils/fetchWithRefresh";
import { useDispatch } from "../../services/hooks";
import FeedPage from "../../pages/feed/feed";
import { OrderInfo } from "../../pages/order-info/order-info";
import { Order } from "../Order/Order";
import { ProfileOrderInfo } from "../../pages/profile-order-info/profile-order-info";
import { OrderUser } from "../OrderUser/OrderUser";
import { UpdateProfileForm } from "../UpdateProfileForm/UpdateProfileForm";
import { OrdersHistory } from "../OrdersHistory/OrdersHistory";

function App() {
  let location = useLocation();
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const [showFeedModal, setShowFeedModal] = useState<boolean>(false);

  const closeFeedModal = () => {
    setShowFeedModal(false);
    navigate("/feed");
  };

  const [showProfileModal, setShowProfileModal] = useState<boolean>(false);

  const closeProfileModal = () => {
    setShowProfileModal(false);
    navigate("/profile/orders");
  };

  const locationState = location.state as { backgroundLocation: Location };

  const background = locationState && locationState.backgroundLocation;
  useEffect(() => {
    dispatch(getIngridientsData());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getRegisterAction());
    fetchWithRefresh<TUserResponce>().then((data) => {
      if (data) {
        dispatch(getRegisterSuccessAction(data.user));
      } else {
        dispatch(getRegisterFailureAction());
      }
    });
  }, [dispatch]);

  return (
    <>
      <AppHeader />
      <Routes location={background || location}>
        <Route path="/" element={<HomePage />} />
        <Route path="/feed" element={<FeedPage />} />
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
          <Route path="/profile/orders" element={<OrdersHistory />} />
        </Route>
        <Route
          path="/profile/orders/:id"
          element={
            <ProtectedRouteElement>
              <ProfileOrderInfo />
            </ProtectedRouteElement>
          }
        />
        <Route path="/feed/:id" element={<OrderInfo />} />
        <Route path="/ingredients/:id" element={<IngridientsDetails />} />
      </Routes>
      {background && (
        <Routes>
          <Route
            path="/ingredients/:id"
            element={
              <Modal title="Детали ингридиента">
                <IngridientsDetails />
              </Modal>
            }
          />
          <Route
            path="/feed/:id"
            element={
              <Modal onClose={closeFeedModal}>
                <Order />
              </Modal>
            }
          />
          <Route
            path="/profile/orders/:id"
            element={
              <ProtectedRouteElement>
                <Modal onClose={closeProfileModal}>
                  <OrderUser />
                </Modal>
              </ProtectedRouteElement>
            }
          />
        </Routes>
      )}
    </>
  );
}

export default App;
