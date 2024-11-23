export const ADD_TESTIMONIAL = "ADD_TESTIMONIAL";
export const SET_IMAGE = "SET_IMAGE";
export const SET_PERSON_NAME = "SET_PERSON_NAME";
export const SET_PERSON_RATING = "SET_PERSON_RATING";
export const SET_EDITING_ITEM = "SET_EDITING_ITEM";
export const RESET_FORM = "RESET_FORM";
export const OPEN_FORM = "OPEN_FORM";
export const SET_CONTENT = "SET_CONTENT";


export const addTestimonial = (person) => ({
  type: ADD_TESTIMONIAL,
  payload: person,
});

export const setContent = (content) => ({
  type: SET_CONTENT,
  payload: content,
});

export const setPersonRating = (rating) => ({
  type: SET_PERSON_RATING,
  payload: rating,
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
