import {
    resetPasswordReducer as reducer,
    initialStateReset as state,
  } from "..";
import { getResetSuccessAction, getResetFailureAction } from '../../actions/passwordReset';

describe('reset-password reducer test', () => {
    it('should handle the initial state', () => {
        //@ts-ignore
        expect(reducer(undefined, {})).toEqual(state);
      })
    it('should handle forgot-password success', () => {
        expect(reducer(state, getResetSuccessAction(true)))
            .toEqual({
                email: true,
                isLoading: false,
                errors: null,
            })
    })
    it('should return the error if handle reset-password failed', () => {
        expect(reducer(state, getResetFailureAction()))
            .toEqual({
                email: '',
                isLoading: false,
                errors: true,
            })
    })
})