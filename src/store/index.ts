import { combineReducers } from "redux";
import game from "./game/reducers";

const createReducer = () =>
  combineReducers({
    game
  });

export default createReducer;
