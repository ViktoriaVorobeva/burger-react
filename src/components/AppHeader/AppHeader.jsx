import React from "react";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import headerStyles from "./app-header.module.css";

function AppHeader() {
  return (
    <header className={headerStyles.header}>
      <div className="container">
        <div className={headerStyles.container}>
        <nav>
          <div className="pb-4 pt-4">
            <ul className={headerStyles.list}>
              <li>
                <div className="pr-5 pl-5 pb-4 pt-4 mr-2">
                  <a className={headerStyles.link} href="#">
                    <BurgerIcon type="primary" />
                    <p className="text text_type_main-default pl-2">
                      Конструктор
                    </p>
                  </a>
                </div>
              </li>
              <li>
                <div className="pr-5 pl-5 pb-4 pt-4">
                  <a className={headerStyles.link} href="#">
                    <ListIcon type="secondary" />
                    <p className="text text_type_main-default text_color_inactive pl-2">
                      Лента заказов
                    </p>
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </nav>
        <a hreaf="#">
          <Logo />
        </a>
        <div className="pr-5 pl-5 pb-4 pt-4">
          <a className={headerStyles.link} href="#">
            <ProfileIcon type="secondary" />
            <p className="text text_type_main-default text_color_inactive pl-2">Личный кабинет</p>
          </a>
        </div>
        </div>
      </div>
    </header>
  );
}

export default AppHeader;
