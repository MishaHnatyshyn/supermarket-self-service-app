import {
  LOGIN_ERROR,
  LOGIN_START,
  LOGIN_SUCCESS,
  REGISTER_ERROR,
  REGISTER_START,
  REGISTER_SUCCESS,
} from '../auth/actionTypes';

const initialState = {
  showGlobalLoader: false,
};

export default function uiReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_START:
    case REGISTER_START:
      return {
        ...state,
        showGlobalLoader: true,
      };
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
