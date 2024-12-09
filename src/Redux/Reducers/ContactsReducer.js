import { SET_CONTACTS } from "../Actions/ActionTypes";

const initialState = {
  contacts: [],
};

const contactsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CONTACTS:
      return { ...state, contacts: action.payload, error: null };
    default:
      return state;
  }
};

export default contactsReducer;
