import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
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

function App() {
  let location = useLocation();
  const background = location.state && location.state.backgroundLocation;

  return (
    <>
      <AppHeader />
      <Routes location={background || location}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPage />} />
        <Route path="/reset-password" element={<ResetPage />} />
        <Route
          path="/profile"
          element={
            <ProtectedRouteElement>
              <ProfilePage />
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
                <Modal
                  title="Детали ингридиента"
                >
                  <IngridientsDetails />
                </Modal>
            }
          ></Route>
        </Routes>
      )}
    </>
  );
}

export default App;
