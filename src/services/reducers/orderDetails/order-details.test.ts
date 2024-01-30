import {
    orderReducer as reducer,
    initialStateOrder as state,
  } from "..";
import { getOrderActionSuccess } from '../../actions/orderDetails';
import { number } from '../../../utils/test-constants';

describe('order-details reducer test', () => {
    it('should handle the initial state', () => {
        //@ts-ignore
        expect(reducer(undefined, {})).toEqual(state);
      })
    it('should handle get order details success', () => {
        expect(reducer(state, getOrderActionSuccess(number)))
            .toEqual({
                order: number,
                isLoading: false,
                errors: null,
            })
    })
})