import axios from "axios";
import { setAlert } from "./alert";
import {
  ADD_FIGURE,
  UPDATE_FIGURE,
  GET_FIGURE,
  GET_PUBLIC_FIGURE,
  GET_FIGURES,
  DELETE_FIGURE,
  CLEAR_FIGURES,
  FIGURE_ERROR,
  STOP_LOADING
} from "./types";

// Create new figure
export const createFigure = figConfig => async dispatch => {
  const config = {
    headers: { "Content-Type": "application/json" }
  };
  try {
    const res = await axios.post("/api/figures", figConfig, config);
    dispatch({
      type: ADD_FIGURE,
      payload: res.data
    });
    dispatch(setAlert("New figure saved", "success"));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "error")));
    }
    dispatch({
      type: FIGURE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    });
  }
};

// Update figure by id
export const updateFigure = (figId, figConfig) => async dispatch => {
  const config = {
    headers: { "Content-Type": "application/json" }
  };
  try {
    const res = await axios.post(`/api/figures/${figId}`, figConfig, config);
    dispatch({
      type: UPDATE_FIGURE,
      payload: res.data
    });
    dispatch(setAlert("Figure saved", "success"));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "error")));
    }
    dispatch({
      type: FIGURE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    });
  }
};

// Get figure by id
export const getFigure = id => async dispatch => {
  try {
    const res = await axios.get(`/api/figures/${id}`);
    dispatch({
      type: GET_FIGURE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: FIGURE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    });
  }
};

// Get public figure by id
export const getPublicFigure = id => async dispatch => {
  try {
    const res = await axios.get(`/api/figures/public/${id}`);
    dispatch({
      type: GET_PUBLIC_FIGURE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: FIGURE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    });
  }
};

// Get all figures
export const getFigures = () => async dispatch => {
  try {
    const res = await axios.get("/api/figures/");
    dispatch({
      type: GET_FIGURES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: FIGURE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    });
  }
};

// Delete figure by id
export const deleteFigure = id => async dispatch => {
  try {
    await axios.delete(`/api/figures/${id}`);
    dispatch({
      type: DELETE_FIGURE,
      payload: id
    });
    dispatch(setAlert("Figure deleted", "success"));
  } catch (err) {
    dispatch({
      type: FIGURE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    });
  }
};

// Clear figure and figures from state
export const clearFigures = () => dispatch => {
  dispatch({ type: CLEAR_FIGURES });
};

// Stop loading if not retrieving a figure
export const stopLoading = () => dispatch => {
  dispatch({ type: STOP_LOADING });
};
