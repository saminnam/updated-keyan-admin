import {
  ADD_SERVICE,
  SET_SERVICE_TITLE,
  SET_DESCRIPTION,
  RESET_FORM,
  SET_SUCCESS,
  SET_ERROR,
  SET_EDITING_ITEM,
} from "../Actions/ActionTypes";

const initialState = {
  services: [],
  title: "",
  description: "",
  editingItem: null,
  success: false,
  error: false,
};

const servicesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_SERVICE:
      return {
        ...state,
        services: action.payload,
      };

    case SET_SERVICE_TITLE:
      return {
        ...state,
        title: action.payload,
      };
    case SET_DESCRIPTION:
      return {
        ...state,
        description: action.payload,
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
        description: "",
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

export default servicesReducer;
