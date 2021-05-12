import apis from "./apis";

export const FETCH_CAMP_LIST = "FETCH_CAMP_LIST";
export const FETCH_RETURN = "FETCH_RETURN";
export const SET_STEP_NEXT = "SET_STEP_NEXT";
export const SET_STEP_BACK = "SET_STEP_BACK";

export const fetachGetCampList = () => async (dispatch) => {
  const res = await apis.fetachGetCampList();

  dispatch({
    type: FETCH_CAMP_LIST,
    payload: res.data,
  });
};

export const fetachReturn = (data) =>  {
  dispatch({
    type: FETCH_RETURN,
    payload: data,
  });
};

export const setStepNext = (data) =>  {
  return{
    type: SET_STEP_NEXT,
    payload: data,
  };
};

export const setStepBack = (data) =>  {
  return{
    type: SET_STEP_BACK,
    payload: data,
  };
};