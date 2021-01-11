// will be boilerplate actions
export const SUCCESS = "SUCCESS";

export const FAILURE = "FAILURE";

// updates authentication state of user
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";

export const LOGIN_FAILURE = "LOGIN_FAILURE";

// saves profile data from Auth0 to global state
export const ADD_PROFILE = "ADD_PROFILE";

export const REMOVE_PROFILE = "REMOVE_PROFILE";

// tracks changes and submits of user submitted text form
export const USER_INPUT_CHANGE = "USER_INPUT_CHANGE";

export const USER_INPUT_SUBMIT = "USER_INPUT_SUBMIT";

// saves/removes user profile to/from DB
export const SET_DB_PROFILE = "SET_DB_PROFILE";

export const REMOVE_DB_PROFILE = "REMOVE_DB_PROFILE";

// retreives/deletes post from DB
export const FETCH_DB_POSTS = "FETCH_DB_POSTS";

export const REMOVE_DB_POSTS = "REMOVE_DB_POSTS";
