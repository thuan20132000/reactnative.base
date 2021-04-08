import {
    INCREASE_NOTFICATION,
    DECREASE_NOTIFICATION
} from '../actions/notificationActions'




const initialState = {
    current_notification_number: 0
}



export default (state = initialState, action) => {

    switch (action.type) {
        case INCREASE_NOTFICATION:
            state.current_notification_number = state.current_notification_number + 1;
            return state;

        case DECREASE_NOTIFICATION:
            state.current_notification_number = state.current_notification_number - 1;
            return state;


        default:
            break;
    }

    return state;
}