import { useEffect } from 'react';
import styles from './order-info.module.css';
import { useDispatch } from '../../types/hooks';
import { Order } from '../../components/Order/Order';
import { WS_CONNECTION_CLOSED, WS_CONNECTION_START } from '../../services/websockets/actions';

export const OrderInfo = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({type: WS_CONNECTION_START});
        return () => {
            dispatch({type: WS_CONNECTION_CLOSED});
        };
    }, []);

    return (
        <div className={styles.info}>
            <Order />
        </div>
    )
}