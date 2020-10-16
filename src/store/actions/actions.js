import * as ACTION_TYPES from "./action_types";

// Regular actions
export const SUCCESS = {
  type: ACTION_TYPES.SUCCESS,
};

export const FAILURE = {
  type: ACTION_TYPES.FAILURE,
};

//Action creators
export const success = () => {
  return {
    type: ACTION_TYPES.SUCCESS,
  };
};

export const failure = () => {
  return {
    type: ACTION_TYPES.FAILURE,
  };
};

export const login_sucess = () => {
  return {
    type: ACTION_TYPES.LOGIN_SUCCESS,
  };
};

export const login_failure = () => {
  return {
    type: ACTION_TYPES.LOGIN_FAILURE,
  };
};

export const add_profile = () => {
  return {
    type: ACTION_TYPES.ADD_PROFILE,
    payload: profile,
  };
};

export const remove_profile = () => {
  return {
    type: ACTION_TYPES.REMOVE_PROFILE,
  };
};

export const user_input_change = () => {
  return {
    type: ACTION_TYPES.USER_INPUT_CHANGE,
    payload: Text,
  };
};

export const user_input_submit = () => {
  return {
    type: ACTION_TYPES.USER_INPUT_SUBMIT,
    payload: text,
  };
};
