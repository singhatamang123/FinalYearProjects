// reducer is simply a function that takes in our current state and it's going to take an action of what we want to do like load data, showing error
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
} from "../constant/productConstants";

export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] };
    // update states in this value

    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload };
    //return back a payload of data and we get API call

    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };

    // if we have bad data we return back error
    default:
      return state;
  }
};

export const productDetailsReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true, ...state };
    // update states in this value

    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };
    //return back a payload of data and we get API call

    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload };

    // if we have bad data we return back error
    default:
      return state;
  }
};
