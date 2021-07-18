import UserModel from '../../app/models/userModel';
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
            console.warn('login red')
            return {
                ...state,
                userInformation: action.data
            }

        case LOGOUT:
            console.warn('dfds log')
            return {
                ...state,
                userInformation: action.data
            }


        case UPDATE_USER_PROFILE:

            let newInformation = state.userInformation;
            newInformation.user = action.data;
            return {
                ...state,
                userInformation: newInformation
            }

        default:
            break;
    }

    return state;
}