import React, {FormEvent, useEffect, useState} from "react";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./reset.module.css";
import { Link, Navigate, useNavigate} from 'react-router-dom';
import { getPasswordReset } from "../../services/actions";
import { useDispatch, useSelector } from "../../services/hooks";

export function ResetPage() {
  const {email} = useSelector((state) => state.forgotPassword);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setValue] = useState({ password: "", token: "" });

  const onChange = (e:FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement
    setValue({ ...form, [target.name]: target.value });
  };

  useEffect(() => {
    if (email) {
        <Navigate
          to={'/forgot-password'}
        />
  }}, [email]);

  let reset = (e:React.SyntheticEvent) => {
    e.preventDefault();
    dispatch(getPasswordReset(form));
    navigate('/', {replace: true});
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <form onSubmit={reset} className={styles.form}>
          <h1 className='mb-6'>Восстановление пароля</h1>
          <Input
            type={"password"}
            placeholder={"Введите новый пароль"}
            onChange={onChange}
            value={form.password}
            name={"password"}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
            extraClass="mb-6"
          />
          <Input
            type={"text"}
            placeholder={"Введите код из письма"}
            onChange={onChange}
            value={form.token}
            name={"token"}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
            extraClass="mb-6"
          />
          <Button extraClass='mb-20' htmlType="submit" type="primary" size="large">
          Сохранить
          </Button>
          <div>
            <div className={styles.text}>
              <p className="text text_type_main-default text_color_inactive">
              Вспомнили пароль?
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
