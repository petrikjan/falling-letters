import * as Actions from "../actions";

const pauseReducer = function (state = false, action:any) {
  switch (action.type) {
    case Actions.SET_PAUSE: {
      const { payload } = action;
      return payload;
    }
    default: {
      return state;
    }
  }
};

export default pauseReducer;
