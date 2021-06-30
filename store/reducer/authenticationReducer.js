import {
    SIGNIN,
    SIGNUP,
    LOGOUT,
    UPDATE_USER_PROFILE
} from '../actions/authenticationActions'



const initialState = {
    userInformation: ''
}


export default (state = initialState, action) => {
    switch (action.type) {
        case SIGNIN:

            return {
                ...state,
                userInformation: action.data
            }
        
        case UPDATE_USER_PROFILE:

            let newInformation = state.userInformation;
            newInformation.user = action.data;
            return {
                ...state,
                userInformation:newInformation
            }

        default:
            break;
    }

    return state;
}