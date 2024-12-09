import {
  ADD_PORTFOLIO,
  // OPEN_FORM,
  SET_EDITING_ITEM,
  SET_TITLE,
  SET_WEBSITE_URL,
  SET_IMAGE,
  RESET_FORM,
} from "../Actions/ActionTypes";

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

// export const openForm = (isOpen) => ({
//   type: OPEN_FORM,
//   payload: isOpen,
// });

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
