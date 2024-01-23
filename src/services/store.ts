import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { getCookie } from "../utils/cookie";
import { wsUrl } from "../utils/url";
import { wsActions, wsActionsUser } from "./actions";
import { socketMiddleware } from "./middleware/socketMiddleware";
import {
  ingridientsReducer,
  constructorReducer,
  orderReducer,
  forgotPasswordReducer,
  resetPasswordReducer,
  registerReducer,
} from "./reducers";
import { wsReducer, wsUserReducer } from "./reducers/websockets/websockets";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(
  applyMiddleware(
    thunk,
    socketMiddleware(() => wsUrl + "/all", wsActions),
    socketMiddleware(
      () => wsUrl + `?token=${getCookie("token")}`,
      wsActionsUser
    )
  )
);

const rootReduces = combineReducers({
  ingridients: ingridientsReducer,
  burgerConstructor: constructorReducer,
  orderDetails: orderReducer,
  forgotPassword: forgotPasswordReducer,
  resetPassword: resetPasswordReducer,
  register: registerReducer,
  webSocket: wsReducer,
  webSocketUser: wsUserReducer,
});

export const store = createStore(rootReduces, enhancer);
