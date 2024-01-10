import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { ProfileMenu } from "../../components/ProfileMenu/ProfileMenu";
import {
  wsConnectionClosedUser,
  wsConnectionStartUser,
} from "../../services/actions";
import { useDispatch } from "../../services/hooks";
import styles from "./profile.module.css";

export function ProfilePage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(wsConnectionStartUser());
    return () => {
      dispatch(wsConnectionClosedUser());
    };
  }, []);
  return (
    <div className={styles.wrapper}>
      <ProfileMenu />
      <Outlet />
    </div>
  );
}
