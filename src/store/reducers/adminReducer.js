import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingGender: false,
    genders: [],
    roles: [],
    positions: []
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            state.isLoadingGender = true;
            console.log('Check fire fetch gender start', action);
            return {
                ...state,
            }

        case actionTypes.FETCH_GENDER_SUCCESS:
            state.genders = action.data;
            state.isLoadingGender = false;
            console.log('Check fire fetch gender success', state);
            return {
                ...state,
            }

        case actionTypes.FETCH_GENDER_FAIDED:
            console.log('Check fire fetch gender failed', action);
            state.isLoadingGender = false;
            state.genders = [];
            return {
                ...state,
            }

        default:
            return state;
    }
}

export default adminReducer;