export const ADD_BLOG = "ADD_BLOG";
export const SET_EDITING_ITEM = "SET_EDITING_ITEM";
export const RESET_FORM = "RESET_FORM";
export const OPEN_FORM = "OPEN_FORM";
export const SET_TITLE = "SET_TITLE";
export const SET_CATEGORY = "SET_CATEGORY";
export const SET_CONTENT = "SET_CONTENT";
export const SET_SUBCONTENT = "SET_SUBCONTENT";
export const SET_AUTHOR = "SET_AUTHOR";
export const SET_IMAGE = "SET_IMAGE";
export const SET_SUCCESS = "SET_SUCCESS";
export const SET_ERROR = "SET_ERROR";

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

export const openForm = (isOpen) => ({
  type: OPEN_FORM,
  payload: isOpen,
});

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

export const setSuccess = (status) => ({
  type: SET_SUCCESS,
  payload: status,
});

export const setError = (status) => ({
  type: SET_ERROR,
  payload: status,
});
