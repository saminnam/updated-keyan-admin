export const ADD_SERVICE = "ADD_SERVICE";
export const SET_EDITING_ITEM = "SET_EDITING_ITEM";
export const RESET_FORM = "RESET_FORM";
export const OPEN_FORM = "OPEN_FORM";
export const SET_SERVICE_TITLE = "SET_SERVICE_TITLE";
export const SET_DESCRIPTION = "SET_DESCRIPTION";

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

export const openForm = (isOpen) => ({
  type: OPEN_FORM,
  payload: isOpen,
});

export const setTitle = (title) => ({
  type: SET_SERVICE_TITLE,
  payload: title,
});

export const setDescription = (description) => ({
  type: SET_DESCRIPTION,
  payload: description,
});
