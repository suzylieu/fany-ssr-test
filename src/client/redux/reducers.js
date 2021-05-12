import { FETCH_CAMP_LIST, FETCH_RETURN } from "./actions";

const initialValues = {
	camps: [],
	return: ''
}
const reducers = (state = initialValues, action) => {
	switch (action.type) {
		case FETCH_CAMP_LIST:
			return {
				...state,
				camps: action.payload,
			};
		case FETCH_RETURN:
			return {
				...state,
				return: action.payload,
			};
		default:
			return state;
	}
};

export default reducers;