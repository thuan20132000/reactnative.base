export const SIGNIN = 'SIGNIN'
export const SIGNUP = 'SIGNUP'
export const LOGOUT = 'LOGOUT'



export const signin = (data) => {
    return {
        type:SIGNIN,
        data:data
    }
}