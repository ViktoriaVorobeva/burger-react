import {
    orderReducer as reducer,
    initialStateOrder as state,
  } from "../reducers";
import { getOrderActionSuccess } from '../actions/orderDetails';
import { number } from '../../utils/test-constants';

describe('order-details reducer test', () => {
    it('should handle get order details success', () => {
        expect(reducer(state, getOrderActionSuccess(number)))
            .toEqual({
                order: number,
                isLoading: false,
                errors: null,
            })
    })
})