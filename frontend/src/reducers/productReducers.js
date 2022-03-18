// reducer is simply a function that takes in our current state and it's going to take an action of what we want to do like load data, showing error
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,


  PRODUCT_RECOMMEND_LIST_REQUEST,
  PRODUCT_RECOMMEND_LIST_SUCCESS,
  PRODUCT_RECOMMEND_LIST_FAIL,


  PRODUCT_RECOMMEND_CONTENT_LIST_REQUEST,
  PRODUCT_RECOMMEND_CONTENT_LIST_SUCCESS,
  PRODUCT_RECOMMEND_CONTENT_LIST_FAIL,


  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,

  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_RESET,


  PRODUCT_TOP_REQUEST,
  PRODUCT_TOP_SUCCESS,
  PRODUCT_TOP_FAIL,


  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,


  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_RESET,


  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_RESET,


  PRODUCT_CATEGORY_REQUEST,
  PRODUCT_CATEGORY_SUCCESS,
  PRODUCT_CATEGORY_FAIL,

} from "../constant/productConstants";

export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] };
    // update states in this value

    case PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        page: action.payload.page,
        pages: action.payload.pages
      };
    //return back a payload of data and we get API call

    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };

    // if we have bad data we return back error
    default:
      return state;
  }
};


export const productRecommendReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_RECOMMEND_LIST_REQUEST:
      return { loading: true, products: [] };
    // update states in this value

    case PRODUCT_RECOMMEND_LIST_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
      };
    //return back a payload of data and we get API call

    case PRODUCT_RECOMMEND_LIST_FAIL:
      return { loading: false, error: action.payload };

    // if we have bad data we return back error
    default:
      return state;
  }
};


export const productContentRecommendReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_RECOMMEND_CONTENT_LIST_REQUEST:
      return { loading: true, products: [] };
    // update states in this value

    case PRODUCT_RECOMMEND_CONTENT_LIST_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
      };
    //return back a payload of data and we get API call

    case PRODUCT_RECOMMEND_CONTENT_LIST_FAIL:
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


export const productReviewCreateReducer = (
  state = {},
  action
) => {
  switch (action.type) {
    case PRODUCT_CREATE_REVIEW_REQUEST:
      return { loading: true };
    // update states in this value

    case PRODUCT_CREATE_REVIEW_SUCCESS:
      return { loading: false, success: true }
    //return back a payload of data and we get API call

    case PRODUCT_CREATE_REVIEW_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    // if we have bad data we return back error

    case PRODUCT_CREATE_REVIEW_RESET:
      return {}

    default:
      return state;
  }
};


export const productTopRatedReducer = (
  state = { products: [] },
  action
) => {
  switch (action.type) {
    case PRODUCT_TOP_REQUEST:
      return { loading: true, products: [] };
    // update states in this value

    case PRODUCT_TOP_SUCCESS:
      return { loading: false, products: action.payload };
    //return back a payload of data and we get API call

    case PRODUCT_TOP_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    // if we have bad data we return back error

    default:
      return state;
  }
};


// 

export const productDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return { loading: true }

    case PRODUCT_DELETE_SUCCESS:
      return { loading: false, success: true }

    case PRODUCT_DELETE_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}


export const productCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REQUEST:
      return { loading: true }

    case PRODUCT_CREATE_SUCCESS:
      return { loading: false, success: true, product: action.payload }

    case PRODUCT_CREATE_FAIL:
      return { loading: false, error: action.payload }

    case PRODUCT_CREATE_RESET:
      return {}

    default:
      return state
  }
}



export const productUpdateReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_UPDATE_REQUEST:
      return { loading: true }

    case PRODUCT_UPDATE_SUCCESS:
      return { loading: false, success: true, product: action.payload }

    case PRODUCT_UPDATE_FAIL:
      return { loading: false, error: action.payload }

    case PRODUCT_UPDATE_RESET:
      return { product: {} }

    default:
      return state
  }
}



export const categoryListReducer = (state = { category: [] }, action) => {
  switch (action.type) {
    case PRODUCT_CATEGORY_REQUEST:
      return { loading: true, category: [] };
    // update states in this value

    case PRODUCT_CATEGORY_SUCCESS:
      return {
        loading: false,
        category: action.payload.category,
      };
    //return back a payload of data and we get API call

    case PRODUCT_CATEGORY_FAIL:
      return { loading: false, error: action.payload };

    // if we have bad data we return back error
    default:
      return state;
  }
};