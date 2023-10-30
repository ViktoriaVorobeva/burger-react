import React, {useState} from "react";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from 'react-router-dom';
import styles from "./login.module.css";
import { getLogin } from "../../services/registers/actions";
import { useDispatch } from "react-redux";


export function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form, setValue] = useState({ email: '', password: '' });

  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  let login = 
    e => {
      e.preventDefault();
      dispatch(getLogin(form));
      navigate('/', {replace: true});
    };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <form onSubmit={login} className={styles.form}>
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
          <Button extraClass='mb-20' htmlType="submit" type="primary" size="large">
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
