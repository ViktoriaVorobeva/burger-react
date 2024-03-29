import React, { ChangeEvent, FormEvent } from "react";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./forgot.module.css";
import { Link, useNavigate} from 'react-router-dom';
import { getPasswordForgot } from "../../services/actions";
import { useDispatch } from "../../services/hooks";

export function ForgotPage() {
  const [value, setValue] = React.useState("");
  const dispatch = useDispatch();

  const onChange = (e:ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const navigate = useNavigate();
  
  const forgot = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
