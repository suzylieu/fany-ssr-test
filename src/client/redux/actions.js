import apis from "./apis";

export const FETCH_CAMP_LIST = "FETCH_CAMP_LIST";
export const FETCH_RETURN = "FETCH_RETURN";

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