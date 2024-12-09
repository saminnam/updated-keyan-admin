import {
  SET_LOADING,
  SET_ERROR,
  SHOW_IMAGE_PREVIEW,
  POPUP_VISIBLE,
  SET_SUCCESS_POPUP,
  SET_ERROR_POPUP,
  SET_SELECTED_ID,
  SET_EDIT_POPUP,
} from "../Actions/ActionTypes";

const initialState = {
  error: null,
  loading: false,
  showImagePreview: false,
  errors: {},
  popUpVisible: false,
  successPopUp: false,
  errorPopUp: false,
  selectedId: null,
  editPopUp: false,
};

const CommonReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, success: action.payload };
    case SET_ERROR:
      return { ...state, error: action.payload };
    case SET_EDIT_POPUP:
      return { ...state, editPopup: action.payload };
    case SET_SELECTED_ID:
      return { ...state, selectedId: action.payload };
    case POPUP_VISIBLE:
      return { ...state, popUpVisible: action.payload };
    case SET_SUCCESS_POPUP:
      return { ...state, successPopUp: action.payload };
    case SET_ERROR_POPUP:
      return { ...state, errorPopUp: action.payload };
    case SHOW_IMAGE_PREVIEW:
      return { ...state, showImagePreview: action.payload };
    default:
      return state;
  }
};

export default CommonReducer;
