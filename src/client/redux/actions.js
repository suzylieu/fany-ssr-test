export const setStepNext = (data) => {
	return {
		type: 'SET_STEP_NEXT',
		payload: {
			data: data,
		}
	}
}

export const setStepBack = (data) => {
	return {
		type: 'SET_STEP_BACK',
		payload: {
			data: data,
		}
	}
}

export const setDialogOpen = (open) => {
	return {
		type: 'SET_DIALOG_OPEN',
		payload: {
			open: open,
		}
	}
}

export const setDiyStatus = (data) => {
	return {
		type: 'SET_DIY_STATUS',
		payload: {
			data: data,
		}
	}
}

export const setDiyId = (data) => {
	return {
		type: 'SET_DIY_ID',
		payload: {
			data: data,
		}
	}
}

export const setTotalPrice = (data) => {
	return {
		type: 'SET_TOTAL_PRICE',
		payload: {
			data: data,
		}
	}
}

export const SET_STEP_NEXT = setStepNext().type;
export const SET_STEP_BACK = setStepBack().type;
export const SET_DIALOG_OPEN = setDialogOpen().type;
export const SET_DIY_STATUS = setDiyStatus().type;
export const SET_DIY_ID = setDiyId().type;
export const SET_TOTAL_PRICE = setTotalPrice().type;