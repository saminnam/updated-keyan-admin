import {
  SET_LOADING,
  SET_ERROR,
  SHOW_IMAGE_PREVIEW,
  POPUP_VISIBLE,
  SET_SUCCESS_POPUP,
  SET_ERROR_POPUP,
  SET_SELECTED_ID,
  SET_EDIT_POPUP,
} from "../Actions/ActionTypes";

export const setLoading = (status) => ({
  type: SET_LOADING,
  payload: status,
});

export const setError = (message) => ({
  type: SET_ERROR,
  payload: message,
});

export const setShowImagePreview = (status) => ({
  type: SHOW_IMAGE_PREVIEW,
  payload: status,
});

export const setEditPopUp = (status) => ({
  type: SET_EDIT_POPUP,
  payload: status,
})


export const setSuccessPopUP = (status) => (dispatch) => {
  // Dispatch the initial action to set the status
  dispatch({
    type: SET_SUCCESS_POPUP,
    payload: status,
  });

  if (status) {
   
    setTimeout(() => {
      dispatch({
        type: SET_SUCCESS_POPUP,
        payload: false,
      });
    }, 1000); 
  }
};

export const setErrorPopUP = (status) => (dispatch) => {
  dispatch({
    type: SET_ERROR_POPUP,
    payload: status,
  });

  if (status) {
    setTimeout(() => {
      dispatch({
        type: SET_SUCCESS_POPUP,
        payload: false,
      });
    }, 1000); 
  }
};


export const setPopUpVisible = (status) => ({
  type: POPUP_VISIBLE,
  payload: status,
});

export const setSelectedId = (id) => ({
  type: SET_SELECTED_ID,
  payload: id,
})


