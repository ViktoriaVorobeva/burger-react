import React, { useEffect, useState } from "react";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./register.module.css";
import { getRegister } from "../../services/registers/actions";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { BASE_URL } from "../../utils/url";
import { useDispatch, useSelector } from "react-redux";

const REGISTERDATA = `${BASE_URL}/auth/register`;

export function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {user} = useSelector(state => state.register);

  const [form, setValue] = useState({ email: "", password: "", name: "" });

  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  let register = (e) => {
    e.preventDefault();
    dispatch(getRegister(REGISTERDATA, form));
    navigate('/', {replace: true});
  };

  useEffect(() => {
    if (user) {
        <Navigate
          to={'/'}
        />
  }}, [user]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <form onSubmit={register} className={styles.form}>
          <h1 className="mb-6">Регистрация</h1>
          <Input
            type={"text"}
            placeholder={"Имя"}
            onChange={onChange}
            value={form.name}
            name={"name"}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
            extraClass="mb-6"
          />
          <Input
            type={"email"}
            placeholder={"E-mail"}
            onChange={onChange}
            value={form.email}
            name={"email"}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
            extraClass="mb-6"
          />
          <Input
            type={"password"}
            placeholder={"Пароль"}
            onChange={onChange}
            value={form.password}
            name={"password"}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
            extraClass="mb-6"
          />
          <Button
            extraClass="mb-20"
            htmlType="submit"
            type="primary"
            size="large"
          >
            Зарегистрироваться
          </Button>
          <div>
            <div className={styles.text}>
              <p className="text text_type_main-default text_color_inactive">
                Уже зарегистрированы?
              </p>
              <Link className={styles.link} to="/login">
                Войти
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
