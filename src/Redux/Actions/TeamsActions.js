import {
  ADD_PERSON,
  ADD_PERSON_ROLE,
  SET_EDITING_ITEM,
  // OPEN_FORM,
  SET_IMAGE,
  RESET_FORM,
  SET_PERSON_NAME,
} from "../Actions/ActionTypes";

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

// export const openForm = (isOpen) => ({
//   type: OPEN_FORM,
//   payload: isOpen,
// });

export const setPersonName = (name) => ({
  type: SET_PERSON_NAME,
  payload: name,
});

export const setImage = (file) => ({
  type: SET_IMAGE,
  payload: file ? { name: file.name, size: file.size, type: file.type } : null,
});
