import {
  SET_ERROR,
  SHOW_IMAGE_PREVIEW,
  POPUP_VISIBLE,
  SET_SELECTED_ID,
} from "../Actions/ActionTypes";

const initialState = {
  error: null,
  showImagePreview: false,
  errors: {},
  popUpVisible: false,
  selectedId: null,
};

const CommonReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ERROR:
      return { ...state, error: action.payload };
    case SET_SELECTED_ID:
      return { ...state, selectedId: action.payload };
    case POPUP_VISIBLE:
      return { ...state, popUpVisible: action.payload };
    case SHOW_IMAGE_PREVIEW:
      return { ...state, showImagePreview: action.payload };
    default:
      return state;
  }
};

export default CommonReducer;
