import { Middleware } from "redux";
import { fetchWithRefresh } from "../../utils/fetchWithRefresh";
import { AppActions } from "../types";

export const socketMiddleware = (url: () => string, actions: AppActions): Middleware => {
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
                            // fetchWithRefresh();
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