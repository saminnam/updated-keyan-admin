import {
  ADD_PORTFOLIO,
  OPEN_FORM,
  SET_EDITING_ITEM,
  SET_TITLE,
  SET_WEBSITE_URL,
  SET_IMAGE,
  RESET_FORM,
  SET_SUCCESS,
  SET_ERROR,
} from "../Actions/Types";

const initialState = {
  portfolioItems: [],
  image: null,
  editingItem: null,
  title: "",
  websiteUrl: "",
  openForm: false,
  success: false,
  error: false,
};

const portfoliosReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PORTFOLIO:
      return {
        ...state,
        portfolioItems: action.payload,
      };

    case SET_TITLE:
      return { ...state, title: action.payload };
    case SET_WEBSITE_URL:
      return { ...state, websiteUrl: action.payload };
    case SET_IMAGE:
      return { ...state, image: action.payload };
    case RESET_FORM:
      return {
        ...state,
        title: "",
        websiteUrl: "",
        image: null,
        editingItem: null,
      };
    case OPEN_FORM:
      return { ...state, openForm: action.payload };

    case SET_EDITING_ITEM:
      return { ...state, editingItem: action.payload };

    case SET_SUCCESS:
      return {
        ...state,
        success: action.payload,
      };

    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default portfoliosReducer;
