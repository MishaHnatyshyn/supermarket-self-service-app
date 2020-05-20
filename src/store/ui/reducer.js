import {
  LOGIN_ERROR,
  LOGIN_START,
  LOGIN_SUCCESS,
  REGISTER_ERROR,
  REGISTER_START,
  REGISTER_SUCCESS,
} from '../auth/actionTypes';
import {
  FETCH_USER_DATA_ERROR,
  FETCH_USER_DATA_START,
  FETCH_USER_DATA_SUCCESS,
} from '../user/actionTypes';

const initialState = {
  showGlobalLoader: false,
};

export default function uiReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_START:
    case REGISTER_START:
    case FETCH_USER_DATA_START:
      return {
        ...state,
        showGlobalLoader: true,
      };
    case FETCH_USER_DATA_SUCCESS:
    case FETCH_USER_DATA_ERROR:
    case LOGIN_SUCCESS:
    case LOGIN_ERROR:
    case REGISTER_SUCCESS:
    case REGISTER_ERROR:
      return {
        ...state,
        showGlobalLoader: false,
      };
    default:
      return {
        ...state,
      };
  }
}
