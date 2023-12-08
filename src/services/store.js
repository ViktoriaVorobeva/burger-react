import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk';
import ingridientsReducer from '../services/ingridients/reducer';
import constructorReducer from '../services/burgerConstructor/reducer';
import orderReducer from '../services/orderDetails/reducer';
import forgotPasswordReducer from './passwordForgot/reducer';
import resetPasswordReducer from './passwordReset/reducer';
import registerReducer from './registers/reducer';
import { wsReducer, wsUserReducer } from "./websockets/reducer";
import { socketMiddleware, wsActions, wsActionsUser } from "./websockets/actions";
import { getCookie } from "../utils/cookie";

const wsUrl = 'wss://norma.nomoreparties.space/orders';

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(  applyMiddleware(
  thunk,
  socketMiddleware(() => wsUrl + '/all', wsActions),
  socketMiddleware(() => wsUrl + `?token=${getCookie('token')}`, wsActionsUser),
));

const rootReduces = combineReducers({
    ingridients: ingridientsReducer,
    burgerConstructor: constructorReducer,
    orderDetails: orderReducer,
    forgotPassword: forgotPasswordReducer,
    resetPassword: resetPasswordReducer,
    register: registerReducer,
    webSocket: wsReducer,
    webSocketUser: wsUserReducer
});

export const store = createStore(rootReduces, enhancer);