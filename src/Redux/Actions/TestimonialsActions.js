import {
  ADD_TESTIMONIAL,
  SET_PERSON_RATING,
  SET_EDITING_ITEM,
  SET_CONTENT,
  SET_IMAGE,
  RESET_FORM,
  SET_PERSON_NAME,
} from "../Actions/ActionTypes";

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

export const setPersonName = (name) => ({
  type: SET_PERSON_NAME,
  payload: name,
});

export const setImage = (file) => ({
  type: SET_IMAGE,
  payload: file ? { name: file.name, size: file.size, type: file.type } : null,
});
