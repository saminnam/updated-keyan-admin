import {
  SET_ERROR,
  SHOW_IMAGE_PREVIEW,
  POPUP_VISIBLE,
  SET_SELECTED_ID,
} from "../Actions/ActionTypes";

export const setError = (message) => ({
  type: SET_ERROR,
  payload: message,
});

export const setShowImagePreview = (status) => ({
  type: SHOW_IMAGE_PREVIEW,
  payload: status,
});

export const setPopUpVisible = (status) => ({
  type: POPUP_VISIBLE,
  payload: status,
});

export const setSelectedId = (id) => ({
  type: SET_SELECTED_ID,
  payload: id,
})


