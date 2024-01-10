import { useSelector } from '../../services/hooks';
import { FeedCard } from '../FeedCard/FeedCard';
import styles from './orders-history.module.css';

export function OrdersHistory() {
    const orders = useSelector(state => [...state.webSocketUser.orders].reverse())
    return (
        <section>
            <ul className={`${styles.scroll} `}>
                {orders
                    .map((order) =>
                        <li key={order._id}>
                            <FeedCard order={order} />
                        </li>
                    )}
            </ul>
        </section>
    )
}