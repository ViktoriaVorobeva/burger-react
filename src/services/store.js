import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk';
import ingridientsReducer from '../services/ingridients/reducer';
import constructorReducer from '../services/burgerConstructor/reducer';
import orderReducer from '../services/orderDetails/reducer';
import ingridientReducer from '../services/ingridientsDetails/reducer';
import forgotPasswordReducer from './passwordForgot/reducer';
import resetPasswordReducer from './passwordReset/reducer';
import registerReducer from './registers/reducer';

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

const rootReduces = combineReducers({
    ingridients: ingridientsReducer,
    burgerConstructor: constructorReducer,
    ingridientsDetails: ingridientReducer,
    orderDetails: orderReducer,
    forgotPassword: forgotPasswordReducer,
    resetPassword: resetPasswordReducer,
    register: registerReducer,
});

export const store = createStore(rootReduces, enhancer);