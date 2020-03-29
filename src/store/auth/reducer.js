import {
  CLEAR_ERROR,
  LOGIN_ERROR,
  LOGIN_START,
  LOGIN_SUCCESS,
  REGISTER_ERROR,
  REGISTER_START,
  REGISTER_SUCCESS,
} from './actionTypes';

const initialState = {
  user: null,
  token: null,
  isError: false,
  isLoading: false,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case REGISTER_ERROR:
    case LOGIN_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case REGISTER_START:
    case LOGIN_START:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        token: action.payload.access_token,
        user: action.payload.id,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: false,
      };
    default:
      return state;
  }
}
