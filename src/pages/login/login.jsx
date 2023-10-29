import React, {useEffect, useState} from "react";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate, Navigate } from 'react-router-dom';
import styles from "./login.module.css";
import { getRegister } from "../../services/registers/actions";
import { BASE_URL } from "../../utils/url";
import { useDispatch, useSelector } from "react-redux";

const LOGINDATA = `${BASE_URL}/auth/login`;

export function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.register);
  const [form, setValue] = useState({ email: '', password: '' });

  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  let login = 
    e => {
      e.preventDefault();
      dispatch(getRegister(LOGINDATA, form));
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
        <form className={styles.form}>
          <h1 className='mb-6'>Вход</h1>
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
          <Button onClick={login} extraClass='mb-20' htmlType="submit" type="primary" size="large">
            Войти
          </Button>
          <div>
            <div className={styles.text}>
              <p className="text text_type_main-default text_color_inactive">
                Вы — новый пользователь?
              </p>
              <Link className={styles.link} to='/register'>Зарегистрироваться</Link>
            </div>
            <div className={styles.text}>
              <p className="text text_type_main-default text_color_inactive">
              Забыли пароль?
              </p>
              <Link className={styles.link} to='/forgot-password'>Восстановить пароль</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
