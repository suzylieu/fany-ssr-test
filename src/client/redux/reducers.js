import {
	FETCH_CAMP_LIST,
	FETCH_CAMP_VERIFY,
	FETCH_RETURN,
	SET_STEP_NEXT,
	SET_STEP_BACK
} from "./actions";

const initialValues = {
	step: 0,
	camps: [],
	diyStatus: 0
}

const reducers = (state = initialValues, action) => {
	switch (action.type) {
		case FETCH_CAMP_LIST:
			return {
				...state,
				camps: action.payload,
			};
		case FETCH_CAMP_VERIFY:
			return {
				...state,
				diyStatus: action.payload,
			};
		case FETCH_RETURN:
			return {
				...state,
				return: action.payload,
			};
		case SET_STEP_NEXT:
			return {
				...state,
				step: state.step + 1
			}
		case SET_STEP_BACK:
			return {
				...state,
				step: state.step - 1
			}
		default:
			return state;
	}
};

export default reducers;