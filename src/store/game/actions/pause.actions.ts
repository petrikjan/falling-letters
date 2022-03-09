export const SET_PAUSE = "SET_PAUSE";

export function setPause(pause: boolean) {
  return {
    type: SET_PAUSE,
    payload: pause,
  }
}
