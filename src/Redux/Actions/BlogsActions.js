import {
  ADD_BLOG,
  SET_EDITING_ITEM,
  RESET_FORM,
  // OPEN_FORM,
  SET_TITLE,
  SET_CATEGORY,
  SET_CONTENT,
  SET_SUBCONTENT,
  SET_AUTHOR,
  SET_IMAGE,
} from "../Actions/ActionTypes";

export const addBlog = (blogs) => ({
  type: ADD_BLOG,
  payload: blogs,
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

export const setCategory = (category) => ({
  type: SET_CATEGORY,
  payload: category,
});

export const setContent = (content) => ({
  type: SET_CONTENT,
  payload: content,
});

export const setSubContent = (subContent) => ({
  type: SET_SUBCONTENT,
  payload: subContent,
});

export const setAuthor = (author) => ({
  type: SET_AUTHOR,
  payload: author,
});

export const setImage = (file) => ({
  type: SET_IMAGE,
  payload: file ? { name: file.name, size: file.size, type: file.type } : null,
});
