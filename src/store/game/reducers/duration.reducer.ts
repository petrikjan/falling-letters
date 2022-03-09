import * as Actions from "../actions";
import {Duration} from "../../../Config"

const durationReducer = function (state = Duration, action:any) {
  switch (action.type) {
    case Actions.SET_DURATION: {
      const { payload } = action;
      return payload;
    }
    default: {
      return state;
    }
  }
};

export default durationReducer;
