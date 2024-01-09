import React, { ChangeEvent, useState, FormEvent } from "react";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./update-profile-form.module.css";
import { updateUser } from "../../services/actions";
import { useDispatch, useSelector } from "../../services/hooks";
import { TUpUser } from "../../services/types";

export const UpdateProfileForm = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.register);
    const [form, setValue] = useState(user);
    const [isFormChange, setChange] = useState(false);
  
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
      const target = e.target;
      setValue({ ...(form as TUpUser), [target.name]: target.value });
      setChange(true);
    };
  
    const save = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      dispatch(updateUser(form as TUpUser));
      setChange(false);
    };
  
    const reset = (e: React.SyntheticEvent) => {
      e.preventDefault();
      setChange(false);
      setValue(user);
    };
  return (
    <div className={styles.container}>
      <form onSubmit={save} className={styles.form}>
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={onChange}
          value={typeof form === "object" ? form.name : ""}
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
          value={typeof form === "object" ? form.email : ""}
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
          value={
            form && typeof form === "object" && form.password
              ? form.password
              : ""
          }
          name={"password"}
          error={false}
          icon={"EditIcon"}
          errorText={"Ошибка"}
          size={"default"}
          extraClass="mb-6"
        />
        <div>
          {isFormChange && (
            <>
              <Button htmlType="submit" type="primary" size="medium">
                Сохранить
              </Button>
              <Button
                onClick={reset}
                htmlType="button"
                type="secondary"
                size="medium"
              >
                Отменить
              </Button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};
