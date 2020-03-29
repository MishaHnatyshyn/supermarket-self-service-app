import { HIDE_LOADER, SHOW_LOADER } from './actionTypes';

const initialState = {
  showGlobalLoader: false,
};

export default function uiReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_LOADER:
      return {
        ...state,
        showGlobalLoader: true,
      };
    case HIDE_LOADER:
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
