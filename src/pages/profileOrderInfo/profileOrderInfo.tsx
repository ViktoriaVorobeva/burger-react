import { useEffect } from "react";
import styles from './profile-order-info.module.css';
import { useDispatch } from "../../types/hooks";
import { OrderUser } from "../../components/OrderUser/OrderUser";
import { WS_CONNECTION_CLOSED_USER, WS_CONNECTION_START_USER } from "../../services/websockets/actions";

export const ProfileOrderInfo = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({type: WS_CONNECTION_START_USER});
        return () => {
            dispatch({type: WS_CONNECTION_CLOSED_USER});;
        };
    }, []);

    return (
        <div className={styles.info}>
            <OrderUser />
        </div>
    )
}