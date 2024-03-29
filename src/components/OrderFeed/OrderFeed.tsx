import { useSelector } from "../../services/hooks";
import {FeedCard} from "../FeedCard/FeedCard";
import styles from "./order-feed.module.css";

function OrderFeed() {
  const orders = useSelector(state => state.webSocket.orders)
  return (
    <section>
      <h2 className="text text_type_main-large mt-10 mb-5">Лента заказов</h2>
      <ul className={`${styles.scroll} pr-2`}>
        {orders
                .map((order) =>
                    <li key={order._id}>
                        <FeedCard order={order} />
                    </li>
                )}
      </ul>
    </section>
  );
}

export default OrderFeed;
