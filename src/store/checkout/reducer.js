import {
  CREATE_ORDER_ERROR,
  CREATE_ORDER_START,
  CREATE_ORDER_SUCCESS,
  RESET_CHECKOUT_STATE,
  SET_CHECKOUT_DATA,
  TOGGLE_SAVE_PAYMENT_METHOD_CONTROL,
  USE_NEW_PAYMENT_METHOD,
  USE_SAVED_PAYMENT_METHOD,
} from './actionTypes';

const initialState = {
  isLoading: false,
  isError: false,
  basketId: null,
  totalSum: null,
  useSavedPaymentMethod: false,
  useNewPaymentMethod: false,
  saveNewPaymentMethod: false,
  isAuthorizedCheckout: false,
  selectedPaymentTypeId: null,
  paymentDetails: null,
  newOrder: {
    id: null,
    transactionId: null,
    status: null,
    timestamp: null,
  },
};

export default function checkoutReducer(state = initialState, action) {
  switch (action.type) {
    case USE_SAVED_PAYMENT_METHOD:
      return {
        ...state,
        useNewPaymentMethod: false,
        useSavedPaymentMethod: true,
      };
    case USE_NEW_PAYMENT_METHOD:
      return {
        ...state,
        useNewPaymentMethod: true,
        useSavedPaymentMethod: false,
      };
    case SET_CHECKOUT_DATA:
      return {
        ...state,
        basketId: action.payload.basketId,
        totalSum: action.payload.totalSum,
        isAuthorizedCheckout: action.payload.isAuthorizedCheckout,
      };
    case CREATE_ORDER_START:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case CREATE_ORDER_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case TOGGLE_SAVE_PAYMENT_METHOD_CONTROL:
      return {
        ...state,
        saveNewPaymentMethod: !state.saveNewPaymentMethod,
      };
    case CREATE_ORDER_SUCCESS:
      return {
        ...state,
        newOrder: action.payload,
        isLoading: false,
        isError: false,
      };
    case RESET_CHECKOUT_STATE:
      return initialState;
    default:
      return state;
  }
}
