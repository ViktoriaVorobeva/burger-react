import React, { useEffect } from "react";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./forgot.module.css";
import { BASE_URL } from "../../utils/url";
import { Link, Navigate, useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getPasswordForgot } from "../../services/passwordForgot/actions";

const FORGOTPASSWORDDATA = `${BASE_URL}/password-reset`

export function ForgotPage() {
  const [value, setValue] = React.useState("");
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.register);
  const onChange = (e) => {
    setValue(e.target.value);
  };
  const navigate = useNavigate();
  let forgot = 
  e => {
    e.preventDefault();
    dispatch(getPasswordForgot(FORGOTPASSWORDDATA, value));
    navigate('/reset-password', {replace: true});
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
        <form onSubmit={forgot} className={styles.form}>
          <h1 className='mb-6'>Восстановление пароля</h1>
          <Input
            type={"email"}
            placeholder={"Укажите e-mail"}
            onChange={onChange}
            value={value}
            name={"email"}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
            extraClass="mb-6"
          />
          <Button extraClass='mb-20' htmlType="submit" type="primary" size="large">
          Восстановить
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
