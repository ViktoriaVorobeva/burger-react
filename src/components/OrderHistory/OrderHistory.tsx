import { useSelector } from "../../types/hooks";
import { OrderItem } from "../OrderItem/OrderItem";
import styles from "./order-history.module.css";

export function OrderHistory() {
  const orders = useSelector((state) =>
    [...state.webSocketUser.orders].reverse()
  );
  return (
    <section>
      <ul className={`${styles.scroll} `}>
        {orders.map((order) => (
          <li key={order._id}>
            <OrderItem order={order} />
          </li>
        ))}
      </ul>
    </section>
  );
}
