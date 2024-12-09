import {
  ADD_BLOG,
  SET_EDITING_ITEM,
  RESET_FORM,
  // OPEN_FORM,
  SET_TITLE,
  SET_CATEGORY,
  SET_CONTENT,
  SET_SUBCONTENT,
  SET_AUTHOR,
  SET_IMAGE,
} from "../Actions/ActionTypes";

const initialState = {
  blogs: [],
  // openForm: false,
  editingItem: null,
  title: "",
  category: "",
  content: "",
  subContent: "",
  author: "",
  image: null,
};

const blogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BLOG:
      return {
        ...state,
        blogs: action.payload,
      };
    case SET_EDITING_ITEM:
      return {
        ...state,
        editingItem: action.payload,
      };
    case RESET_FORM:
      return {
        ...state,
        title: "",
        category: "",
        content: "",
        subContent: "",
        author: "",
        image: null,
      };
    // case OPEN_FORM:
    //   return {
    //     ...state,
    //     openForm: action.payload,
    //   };
    case SET_TITLE:
      return {
        ...state,
        title: action.payload,
      };
    case SET_CATEGORY:
      return {
        ...state,
        category: action.payload,
      };
    case SET_CONTENT:
      return {
        ...state,
        content: action.payload,
      };
    case SET_SUBCONTENT:
      return {
        ...state,
        subContent: action.payload,
      };
    case SET_AUTHOR:
      return {
        ...state,
        author: action.payload,
      };
    case SET_IMAGE:
      return {
        ...state,
        image: action.payload,
      };
    default:
      return state;
  }
};

export default blogsReducer;
