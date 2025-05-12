import { authService } from "../../services/auth.service.js"

// users
export const SET_USERS = 'SET_USERS'
export const REMOVE_USER = 'REMOVE_USER'

// user 
export const SET_USER = 'SET_USER'

const initialState = {
    users: [],
    loggedinUser: authService.getLoggedinUser(),
}

export function userReducer(state = initialState, cmd) {
    switch (cmd.type) {
        // User
        case SET_USERS:
            return { ...state, users: cmd.users }
        case REMOVE_USER:
            return {
                ...state,
                users: state.users.filter(user => user._id !== cmd.userId)
            }
        // loggedinUser
        case SET_USER:
            return { ...state, loggedinUser: cmd.user }

        default: return state
    }
}