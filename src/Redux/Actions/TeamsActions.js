export const ADD_PERSON = "ADD_PERSON";
export const ADD_PERSON_ROLE = "ADD_PERSON_ROLE";
export const SET_EDITING_ITEM = "SET_EDITING_ITEM";
export const RESET_FORM = "RESET_FORM";
export const OPEN_FORM = "OPEN_FORM";
export const SET_PERSON_NAME = "SET_PERSON_NAME";
export const SET_IMAGE = "SET_IMAGE";

export const addPerson = (person) => ({
  type: ADD_PERSON,
  payload: person,
});

export const addPersonRole = (role) => ({
  type: ADD_PERSON_ROLE,
  payload: role,
});

export const setEditingItem = (item) => ({
  type: SET_EDITING_ITEM,
  payload: item,
});

export const resetForm = () => ({
  type: RESET_FORM,
});

export const openForm = (isOpen) => ({
  type: OPEN_FORM,
  payload: isOpen,
});

export const setPersonName = (name) => ({
  type: SET_PERSON_NAME,
  payload: name,
});

export const setImage = (file) => ({
  type: SET_IMAGE,
  payload: file ? { name: file.name, size: file.size, type: file.type } : null,
});
