import {
    SIGNIN,
    SIGNUP,
    LOGOUT
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

        default:
            break;
    }

    return state;
}