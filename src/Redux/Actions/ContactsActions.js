import { SET_CONTACTS, SET_ERROR, SET_LOADING } from "./Types";

export const setContacts = (contacts) => ({
  type: SET_CONTACTS,
  payload: contacts,
});

export const setError = (error) => ({
  type: SET_ERROR,
  payload: error,
});

export const setLoading = (status) => ({
  type: SET_LOADING,
  payload: status,
});
