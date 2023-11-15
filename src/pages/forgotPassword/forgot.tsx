import React, { FormEvent } from "react";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./forgot.module.css";
import { Link, useNavigate} from 'react-router-dom';
import { useDispatch } from "react-redux";
import { getPasswordForgot } from "../../services/passwordForgot/actions";

export function ForgotPage() {
  const [value, setValue] = React.useState("");
  const dispatch = useDispatch();

  const onChange = (e:FormEvent<HTMLInputElement>) => {
    setValue((e.target as HTMLInputElement).value);
  };

  const navigate = useNavigate();
  
  let forgot = (e:React.SyntheticEvent) => {
    e.preventDefault();
    // @ts-ignore
    dispatch(getPasswordForgot(value));
    navigate('/reset-password', {replace: true});
  };

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
