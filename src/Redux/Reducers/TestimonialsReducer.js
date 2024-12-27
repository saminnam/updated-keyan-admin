import {
  ADD_TESTIMONIAL,
  SET_PERSON_RATING,
  SET_EDITING_ITEM,
  SET_CONTENT,
  SET_IMAGE,
  RESET_FORM,
  SET_SUCCESS,
  SET_ERROR,
  SET_PERSON_NAME,
} from "../Actions/ActionTypes";

const initialState = {
  testimonials: [],
  image: null,
  editingItem: null,
  name: "",
  content: "",
  rating: 0,
};

const testimonialsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TESTIMONIAL:
      return {
        ...state,
        testimonials: action.payload,
      };
    case SET_PERSON_RATING:
      return {
        ...state,
        rating: action.payload,
      };
    case SET_CONTENT:
      return {
        ...state,
        content: action.payload,
      };
    case SET_PERSON_NAME:
      return { ...state, name: action.payload };
    case SET_IMAGE:
      return { ...state, image: action.payload };
    case SET_EDITING_ITEM:
      return { ...state, editingItem: action.payload };
    case RESET_FORM:
      return {
        ...state,
        name: "",
        content: "",
        rating: 0,
        image: null,
        editingItem: null,
      };
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

export default testimonialsReducer;
