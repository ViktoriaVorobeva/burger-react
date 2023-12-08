import React, { useEffect } from "react";
import styles from "./profile.module.css";
import { ProfileMenu } from "../../components/ProfileMenu/ProfileMenu";
import { Outlet } from "react-router-dom";
import { useDispatch } from "../../types/hooks";
import { WS_CONNECTION_CLOSED_USER, WS_CONNECTION_START_USER } from "../../services/websockets/actions";

export function ProfilePage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({type: WS_CONNECTION_START_USER});
    return () => {
        dispatch({type: WS_CONNECTION_CLOSED_USER});
    };
}, []);

  return (
    <div className={styles.wrapper}>
      <ProfileMenu/>
      <Outlet/>
    </div>
  );
}
