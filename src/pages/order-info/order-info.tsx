import { useEffect } from "react";
import { Order } from "../../components/Order/Order";
import { wsConnectionClosed, wsConnectionStart } from "../../services/actions";
import { useDispatch } from "../../services/hooks";
import styles from "./order-info.module.css";

export const OrderInfo = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(wsConnectionStart());
    return () => {
      dispatch(wsConnectionClosed());
    };
  }, []);
  return (
    <div className={styles.info}>
      <Order />
    </div>
  );
};
