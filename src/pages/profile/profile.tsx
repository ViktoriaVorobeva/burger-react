import React, {FormEvent, useState } from "react";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import styles from "./profile.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getLogOut, updateUser } from "../../services/registers/actions";

export function ProfilePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.register);
  const [form, setValue] = useState(user);
  const [isFormChange, setChange] = useState(false);

  const onChange = (e:FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement
    setValue({ ...form, [target.name]: target.value });
    setChange(true);
  };

  const logout = (e:React.SyntheticEvent) => {
    e.preventDefault();
    // @ts-ignore
    dispatch(getLogOut());
    navigate("/", { replace: true });
  };

  const save = (e:React.SyntheticEvent) => {
    e.preventDefault();
    // @ts-ignore
    dispatch(updateUser(form));
    setChange(false);
  };

  const reset = (e:React.SyntheticEvent) => {
    e.preventDefault();
    setChange(false);
    setValue(user);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.list_wrapper}>
        <ul className={styles.list}>
          <li>
            <Link className={styles.link} to={'/'}>
              <p className="text text_type_main-medium">Профиль</p>
            </Link>
          </li>
          <li>
            <Link className={styles.link} to={'/'}>
              <p className="text text_type_main-medium text_color_inactive">
                История заказов
              </p>
            </Link>
          </li>
          <li>
            <Link className={styles.link} onClick={logout} to={'/'}>
              <p className="text text_type_main-medium text_color_inactive">
                Выход
              </p>
            </Link>
          </li>
        </ul>
        <p className="text text_type_main-default text_color_inactive">
          В этом разделе вы можете
          <br /> изменить свои персональные данные
        </p>
      </div>
      <div className={styles.container}>
        <form onSubmit={save} className={styles.form}>
          <Input
            type={"text"}
            placeholder={"Имя"}
            onChange={onChange}
            value={form.name}
            name={"name"}
            error={false}
            icon={"EditIcon"}
            errorText={"Ошибка"}
            size={"default"}
            extraClass="mb-6"
          />
          <Input
            type={"email"}
            placeholder={"Логин"}
            onChange={onChange}
            value={form.email}
            name={"email"}
            error={false}
            icon={"EditIcon"}
            errorText={"Ошибка"}
            size={"default"}
            extraClass="mb-6"
          />
          <Input
            type={"password"}
            placeholder={"Пароль"}
            onChange={onChange}
            value={form.password ? form.password : ""}
            name={"password"}
            error={false}
            icon={"EditIcon"}
            errorText={"Ошибка"}
            size={"default"}
            extraClass="mb-6"
          />
          <div>
           { isFormChange &&
           <>
           <Button htmlType='submit' type="primary" size="medium">
              Сохранить
            </Button>
            <Button onClick={reset}  htmlType="button" type="secondary" size="medium">
              Отменить
            </Button>
            </>
            }
          </div>
        </form>
      </div>
    </div>
  );
}
