import actionTypes from '../actions/actionTypes';

const initialState = {
    genders: [],
    roles: [],
    positions: []
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            console.log('Check it fire fetch gender start:', action)
            return {
                ...state,
            }

        case actionTypes.FETCH_GENDER_SUCCESS:

            let copyState = { ...state };
            console.log('Check it fire fetch gender success:', copyState)
            copyState.genders = action.data;
            return {
                ...state,
            }

        case actionTypes.FETCH_GENDER_FAIDED:
            console.log('Check it fire fetch gender faided:', action)
            return {
                ...state,
            }
        default:
            return state;
    }
}

export default adminReducer;