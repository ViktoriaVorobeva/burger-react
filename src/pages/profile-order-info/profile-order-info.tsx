import { useEffect } from "react";
import { OrderUser } from "../../components/OrderUser/OrderUser";
import {
  wsConnectionClosedUser,
  wsConnectionStartUser,
} from "../../services/actions";
import { useDispatch } from "../../services/hooks";
import styles from "./profile-order-info.module.css";

export const ProfileOrderInfo = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(wsConnectionStartUser());
    return () => {
      dispatch(wsConnectionClosedUser());
    };
  }, []);
  return (
    <div className={styles.info}>
      <OrderUser />
    </div>
  );
};
