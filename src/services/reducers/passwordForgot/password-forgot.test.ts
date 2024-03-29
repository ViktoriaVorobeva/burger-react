import {
    forgotPasswordReducer as reducer,
    initialStateForgot as state,
  } from "..";
import { getForgotSuccessAction, getForgotFailureAction } from '../../actions/passwordForgot';
import { email } from '../../../utils/test-constants';

describe('forgot-password reducer test', () => {
    it('should handle the initial state', () => {
        //@ts-ignore
        expect(reducer(undefined, {})).toEqual(state);
      })
    it('should handle forgot-password success', () => {
        expect(reducer(state, getForgotSuccessAction(email)))
            .toEqual({
                email: email,
                isLoading: false,
                errors: null,
            })
    })
    it('should return error if handle forgot-password failed', () => {
        expect(reducer(state, getForgotFailureAction()))
            .toEqual({
                email: '',
                isLoading: false,
                errors: true,
            })
    })
})