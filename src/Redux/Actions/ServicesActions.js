import {
  ADD_SERVICE,
  SET_SERVICE_TITLE,
  SET_DESCRIPTION,
  RESET_FORM,
  SET_EDITING_ITEM,
} from "../Actions/ActionTypes";

export const addService = (services) => ({
  type: ADD_SERVICE,
  payload: services,
});

export const setEditingItem = (item) => ({
  type: SET_EDITING_ITEM,
  payload: item,
});

export const resetForm = () => ({
  type: RESET_FORM,
});

export const setTitle = (title) => ({
  type: SET_SERVICE_TITLE,
  payload: title,
});

export const setDescription = (description) => ({
  type: SET_DESCRIPTION,
  payload: description,
});
