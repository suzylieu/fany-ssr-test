import apis from "./apis";

export const FETCH_CAMP_LIST = "FETCH_CAMP_LIST";
export const FETCH_RETURN = "FETCH_RETURN";
export const FETCH_CAMP_VERIFY = "FETCH_CAMP_VERIFY";
export const SET_STEP_NEXT = "SET_STEP_NEXT";
export const SET_STEP_BACK = "SET_STEP_BACK";
export const SET_DIALOG_OPEN = "SET_DIALOG_OPEN";

export const fetachGetCampList = () => async (dispatch) => {
  const res = await apis.fetachGetCampList();

  dispatch({
    type: FETCH_CAMP_LIST,
    payload: res.data,
  });
};

export const fetachPostCampVerify = (payload) => async (dispatch) => {
  const res = await apis.fetchPostCampVerify(payload);

  dispatch({
    type: FETCH_CAMP_VERIFY,
    payload: res.data.diy_status,
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

export const setDialogOpen = (data) => {
	return {
		type: SET_DIALOG_OPEN,
		payload: data,
	}
}