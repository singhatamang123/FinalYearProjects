import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,

  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,

  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,

  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_RESET,

  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_RESET,


} from "../constant/usersConstant";

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    // update states in this value

    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    //return back a payload of data and we get API call

    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };

    case USER_LOGOUT:
      return {};

    // if we have bad data we return back error
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    // update states in this value

    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    //return back a payload of data and we get API call

    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };

    case USER_LOGOUT:
      return {};

    // if we have bad data we return back error
    default:
      return state;
  }
};

export const getUserDetails = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { ...state, loading: true };
    // update states in this value

    case USER_DETAILS_SUCCESS:
      return { loading: false, user: action.payload };
    //return back a payload of data and we get API call

    case USER_DETAILS_FAIL:
      return { loading: false, error: action.payload };

    // if we have bad data we return back error
    default:
      return state;
  }
};

export const getUpdateProfileUser = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return { loading: true };
    // update states in this value

    case USER_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload };
    //return back a payload of data and we get API call

    case USER_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload };

    case USER_UPDATE_PROFILE_RESET:
      return {};

    // if we have bad data we return back error
    default:
      return state;
  }
};



export const userListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return { loading: true };
    // update states in this value

    case USER_LIST_SUCCESS:
      return { loading: false, users: action.payload };
    //return back a payload of data and we get API call

    case USER_LIST_FAIL:
      return { loading: false, error: action.payload };

    case USER_LIST_RESET:
      return { users: [] };

    // if we have bad data we return back error
    default:
      return state;
  }
};

