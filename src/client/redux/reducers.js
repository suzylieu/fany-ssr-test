import {
	SET_STEP_NEXT,
	SET_STEP_BACK,
	SET_DIALOG_OPEN,
	SET_DIY_STATUS,
	SET_DIY_ID,
	SET_TOTAL_PRICE
} from './actions';

const initialState = {
	step: 0,
	dialogOpen: false,
	diyStatus: 0,
	diyId: '',
	totalPrice: 0
}

const reducers = (state = initialState, action) => {
	switch (action.type) {
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
		case SET_DIALOG_OPEN:
			return {
				...state,
				dialogOpen: action.payload.open
			}
		case SET_DIY_STATUS:
			return {
				...state,
				diyStatus: action.payload.data
			}
		case SET_DIY_ID:
			return {
				...state,
				diyId: action.payload.data
			}
		case SET_TOTAL_PRICE: {
			let sum = 0;
			const price = [1450, 1500, 1600, 1700, 1800];
			if (action.payload.data.eventType === "S") {
				if (action.payload.data.diyStatus === 1) {
					sum = 150;
				}
				else {
					sum = 300;
				}
			}
			else {
				if (action.payload.data.diyStatus === 1) {
					if (action.payload.data.teamSize === 2 || action.payload.data.teamSize === 3) {
						sum = (price[action.payload.data.teamSize - 2] * action.payload.data.eventCount) * 0.52;
					}
					else {
						sum = (price[action.payload.data.teamSize - 2] * action.payload.data.eventCount) * 0.5;
					}
				}
				else {
					sum = price[action.payload.data.teamSize - 2] * action.payload.data.eventCount
				}
			}
			return {
				...state,
				totalPrice: sum
			}
		}
		default:
			return state;
	}
}

export default reducers;