import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import figure from "./figure";

export default combineReducers({ alert, auth, figure });
