import { combineReducers } from "redux";
import pause from "./pause.reducer";
import duration from "./duration.reducer";

const reducer = combineReducers({
  pause,
  duration,
});

export default reducer;
