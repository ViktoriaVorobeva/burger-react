import { useEffect } from 'react';
import { OrderFeed } from '../../components/OrderFeed/Order-feed';
import { Orders } from '../../components/Orders/Orders';
import { WS_CONNECTION_CLOSED, WS_CONNECTION_START } from '../../services/websockets/actions';
import { useDispatch } from '../../types/hooks';
import styles from './feedpage.module.css';

export const FeedPage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({type: WS_CONNECTION_START});
        return () => {
            dispatch({type: WS_CONNECTION_CLOSED});
        };
    }, []);
    return (
        <section className={styles.main_wrapper}>
            <OrderFeed />
            <Orders />
        </section>
    ) 
}