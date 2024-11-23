import { SET_CONTACTS, SET_ERROR, SET_LOADING } from "../Actions/Types";

const initialState = {
  contacts: [],
  error: null,
  loading: false,
};

const contactsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CONTACTS:
      return { ...state, contacts: action.payload, error: null };
    case SET_ERROR:
      return { ...state, error: action.payload };
    case SET_LOADING:
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

export default contactsReducer;
