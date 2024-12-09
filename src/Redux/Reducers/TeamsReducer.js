import {
  ADD_PERSON,
  ADD_PERSON_ROLE,
  SET_EDITING_ITEM,
  // OPEN_FORM,
  SET_IMAGE,
  RESET_FORM,
  SET_SUCCESS,
  SET_ERROR,
  SET_PERSON_NAME,
} from "../Actions/ActionTypes";

const initialState = {
  teamMembers: [],
  image: null,
  editingItem: null,
  name: "",
  role: "",
  // openForm: false,
};

const teamsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PERSON:
      return {
        ...state,
        teamMembers: action.payload,
      };
    case ADD_PERSON_ROLE:
      return {
        ...state,
        role: action.payload,
      };
    case SET_PERSON_NAME:
      return { ...state, name: action.payload };

    case SET_IMAGE:
      return { ...state, image: action.payload };

    // case OPEN_FORM:
    //   return { ...state, openForm: action.payload };

    case SET_EDITING_ITEM:
      return { ...state, editingItem: action.payload };
    case RESET_FORM:
      return {
        ...state,
        name: "",
        role: "",
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

export default teamsReducer;
