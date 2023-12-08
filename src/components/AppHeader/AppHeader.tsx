import React from "react";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import headerStyles from "./app-header.module.css";
import { NavLink } from "react-router-dom";
import { useSelector } from '../../types/hooks';

function AppHeader() {
  const {user} = useSelector((state) => state.register);
  return (
    <header className={headerStyles.header}>
      <div className="container">
        <div className={headerStyles.container}>
          <nav>
            <div className="pb-4 pt-4">
              <ul className={headerStyles.list}>
                <li>
                  <div className="pr-5 pl-5 pb-4 pt-4 mr-2">
                    <NavLink
                      to="/"
                      className={({ isActive }) =>
                        isActive ? "active" : "non-active"
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <BurgerIcon
                            type={isActive ? "primary" : "secondary"}
                          />
                          <p className="text text_type_main-default pl-2">
                            Конструктор
                          </p>
                        </>
                      )}
                    </NavLink>
                  </div>
                </li>
                <li>
                  <div className="pr-5 pl-5 pb-4 pt-4">
                    <NavLink
                      to="/feed"
                      className={({ isActive }) =>
                        isActive ? "active" : "non-active"
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <ListIcon type={isActive ? "primary" : "secondary"} />
                          <p className="text text_type_main-default pl-2">
                            Лента заказов
                          </p>
                        </>
                      )}
                    </NavLink>
                  </div>
                </li>
              </ul>
            </div>
          </nav>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "non-active")}
          >
            <Logo />
          </NavLink>
          <div className="pr-5 pl-5 pb-4 pt-4">
            <NavLink
              to="/profile"
              className={({ isActive }) => (isActive ? "active" : "non-active")}
            >
              {({ isActive }) => (
                <>
                  <ProfileIcon type={isActive ? "primary" : "secondary"} />
                  <p className="text text_type_main-default pl-2">
                    {user ? user.name : 'Личный кабинет'}
                  </p>
                </>
              )}
            </NavLink>
          </div>
        </div>
      </div>
    </header>
  );
}

export default AppHeader;
