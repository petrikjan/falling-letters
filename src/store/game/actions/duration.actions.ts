export const SET_DURATION = "SET_DURATION";

export function setDuration(duration: number) {
  return {
    type: SET_DURATION,
    payload: duration,
  }
}
