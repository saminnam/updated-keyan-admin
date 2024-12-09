import { SET_CONTACTS } from "./ActionTypes";

export const setContacts = (contacts) => ({
  type: SET_CONTACTS,
  payload: contacts,
});

