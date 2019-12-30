import {
  ADD_FIGURE,
  UPDATE_FIGURE,
  GET_FIGURE,
  GET_PUBLIC_FIGURE,
  GET_FIGURES,
  DELETE_FIGURE,
  CLEAR_FIGURES,
  STOP_LOADING,
  FIGURE_ERROR
} from "../actions/types";

const initialState = {
  figure: null,
  figures: [],
  loading: true,
  error: {}
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_FIGURE:
      return {
        ...state,
        figures: [payload, ...state.figures],
        loading: false
      };
    case UPDATE_FIGURE:
      return {
        ...state,
        figure: payload,
        loading: false
      };
    case GET_FIGURE:
      return {
        ...state,
        figure: payload,
        loading: false
      };
    case GET_PUBLIC_FIGURE:
      return {
        ...state,
        figure: payload,
        loading: false
      };
    case GET_FIGURES:
      return {
        ...state,
        figures: payload,
        loading: false
      };
    case DELETE_FIGURE:
      return {
        ...state,
        figures: state.figures.filter(figure => figure._id !== payload),
        loading: false
      };
    case CLEAR_FIGURES:
      return {
        ...state,
        figure: initialState.figure,
        figures: initialState.figures,
        loading: initialState.loading,
        error: initialState.error
      };
    case STOP_LOADING:
      return {
        ...state,
        loading: false
      };
    case FIGURE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
}
