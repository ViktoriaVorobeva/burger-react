import { Middleware } from "redux";
import { IWsActions } from "../interfaces";

export const WS_CONNECTION_START = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED = 'WS_CONNECTION_CLOSED';
export const WS_GET_ORDERS = 'WS_GET_ORDERS';

export const WS_CONNECTION_START_USER = 'WS_CONNECTION_START_USER';
export const WS_CONNECTION_SUCCESS_USER = 'WS_CONNECTION_SUCCESS_USER';
export const WS_CONNECTION_ERROR_USER = 'WS_CONNECTION_ERROR_USER';
export const WS_CONNECTION_CLOSED_USER = 'WS_CONNECTION_CLOSED_USER';
export const WS_GET_ORDERS_USER = 'WS_GET_ORDERS_USER';

export const wsActions: IWsActions = {
    wsInit: WS_CONNECTION_START,
    onOpen: WS_CONNECTION_SUCCESS,
    onClose: WS_CONNECTION_CLOSED,
    onError: WS_CONNECTION_ERROR,
    onOrders: WS_GET_ORDERS
};

export const wsActionsUser: IWsActions = {
    wsInit: WS_CONNECTION_START_USER,
    onOpen: WS_CONNECTION_SUCCESS_USER,
    onClose: WS_CONNECTION_CLOSED_USER,
    onError: WS_CONNECTION_ERROR_USER,
    onOrders: WS_GET_ORDERS_USER
};

export const socketMiddleware = (url: () => string, actions: IWsActions): Middleware => {
    return (store) => {
        let socket: WebSocket | null = null;
        return (next) => {
            return (action) => {
                const { dispatch } = store;
                const { type } = action;
                const { wsInit, onOpen, onClose, onError, onOrders } = actions;
                if (type === wsInit) {
                    socket = new WebSocket(url());
                    if (socket) {
                        socket.onopen = () => {
                            dispatch({ type: onOpen });
                        };
                        socket.onerror = () => {
                            dispatch({ type: onError });
                        };
                        socket.onmessage = (evt) => {
                            const { data } = evt;
                            const parsedData = JSON.parse(data);
                            const { success } = parsedData;
                            success && dispatch({ type: onOrders, payload: parsedData });
                        };
                        socket.onclose = () => {
                            dispatch({ type: onClose });
                        }
                    }
                }
                return next(action)
            }
        }
    }
}