import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    
  } from "../constant/usersConstant";
  
  export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
      case USER_LOGIN_REQUEST:
        return { loading: true};
      // update states in this value
  
      case USER_LOGIN_SUCCESS:
        return { loading: false, userInfo: action.payload };
      //return back a payload of data and we get API call
  
      case USER_LOGIN_FAIL:
        return { loading: false, error: action.payload };


      case USER_LOGOUT:
          return {}
  
      // if we have bad data we return back error
      default:
        return state;
    }
  };

  export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
      case USER_REGISTER_REQUEST:
        return { loading: true};
      // update states in this value
  
      case USER_REGISTER_SUCCESS:
        return { loading: false, userInfo: action.payload };
      //return back a payload of data and we get API call
  
      case USER_REGISTER_FAIL:
        return { loading: false, error: action.payload };


      case USER_LOGOUT:
          return {}
  
      // if we have bad data we return back error
      default:
        return state;
    }
  };