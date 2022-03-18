import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productListReducer, productDetailsReducer, productReviewCreateReducer,
  productTopRatedReducer, productDeleteReducer, productCreateReducer, productUpdateReducer, productRecommendReducer, productContentRecommendReducer
} from './reducers/productReducers'
import { userLoginReducer, userRegisterReducer, getUserDetails, getUpdateProfileUser, userListReducer, userDeleteReducer, userUpdateReducer } from './reducers/loginReducer'

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: getUserDetails,
  userUpdateProfile: getUpdateProfileUser,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,

  productReviewCreate: productReviewCreateReducer,
  productTopRated: productTopRatedReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productRecommend: productRecommendReducer,
  productContentRecommend: productContentRecommendReducer,

  // categoryList: categoryListReducer,

})


const userInfoFromStorage = localStorage.getItem('userInfo') ?
  JSON.parse(localStorage.getItem('userInfo')) : null;
const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
