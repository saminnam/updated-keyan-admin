import {
  SET_ERROR,
  POPUP_VISIBLE,
  SET_SELECTED_ID,
} from "../Actions/ActionTypes";

export const setError = (message) => ({
  type: SET_ERROR,
  payload: message,
});

export const setPopUpVisible = (status) => ({
  type: POPUP_VISIBLE,
  payload: status,
});

export const setSelectedId = (id) => ({
  type: SET_SELECTED_ID,
  payload: id,
})


