export const SET_EDITING_ITEM = "SET_EDITING_ITEM";
export const RESET_FORM = "RESET_FORM";
export const OPEN_FORM = "OPEN_FORM";
export const SET_TITLE = "SET_TITLE";
export const SET_IMAGE = "SET_IMAGE";
export const SET_WEBSITE_URL = "SET_WEBSITE_URL";
export const ADD_PORTFOLIO = "ADD_PORTFOLIO";

export const addPortfolio = (portfolios) => ({
  type: ADD_PORTFOLIO,
  payload: portfolios,
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
  type: SET_TITLE,
  payload: title,
});

export const setImage = (file) => ({
  type: SET_IMAGE,
  payload: file ? { name: file.name, size: file.size, type: file.type } : null,
});

export const setWebsiteUrl = (url) => ({
  type: SET_WEBSITE_URL,
  payload: url,
});
