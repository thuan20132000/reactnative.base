export const SIGNIN = 'SIGNIN'
export const SIGNUP = 'SIGNUP'
export const LOGOUT = 'LOGOUT'
export const UPDATE_USER_PROFILE = 'UPDATE_USER_PROFILE'



export const signin = (data) => {
    return {
        type:SIGNIN,
        data:data
    }
}

export const logout = (data='') => {
    console.warn('log')

    return {
        type:LOGOUT,
        data:data
    }
}


export const updateUserProfile = (data) => {
    return {
        type:UPDATE_USER_PROFILE,
        data:data
    }
}