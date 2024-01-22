import {
  registerReducer as reducer,
  initialStateRegister as state,
} from "../reducers";
import {
  getRegisterSuccessAction,
  getRegisterFailureAction,
  getLoginSuccessAction,
  getLoginFailureAction,
  getUpSuccessAction,
  getUpFailureAction,
  getLogoutSuccessAction,
  getLogoutFailureAction,
} from "../actions/registers";
import { userRegister } from "../../utils/test-constants";

describe("registration reducer test", () => {
  it("should handle registration success", () => {
    expect(reducer(state, getRegisterSuccessAction(userRegister))).toEqual({
      user: userRegister,
      isLoading: false,
      errors: null,
    });
  });
  it("should return error if registration failed", () => {
    expect(reducer(state, getRegisterFailureAction())).toEqual({
      user: "",
      isLoading: false,
      errors: true,
    });
  });
  it("should handle login success", () => {
    expect(reducer(state, getLoginSuccessAction(userRegister))).toEqual({
      user: userRegister,
      isLoading: false,
      errors: null,
    });
  });
  it("should return error if login failed", () => {
    expect(reducer(state, getLoginFailureAction())).toEqual({
      user: "",
      isLoading: false,
      errors: true,
    });
  });
  it("should handle up success", () => {
    expect(reducer(state, getUpSuccessAction(userRegister))).toEqual({
      user: userRegister,
      isLoading: false,
      errors: null,
    });
  });
  it("should return error if up failed", () => {
    expect(reducer(state, getUpFailureAction())).toEqual({
      user: "",
      isLoading: false,
      errors: true,
    });
  });

  it("should handle logout success", () => {
    expect(reducer(state, getLogoutSuccessAction())).toEqual(state);
  });
  it("should return error if logout failed", () => {
    expect(reducer(state, getLogoutFailureAction())).toEqual({
      user: '',
      isLoading: false,
      errors: true,
    });
  });
});
