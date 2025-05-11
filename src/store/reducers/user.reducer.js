import { authService } from "../../services/auth.service.js"

// user 
export const SET_USER = 'SET_USER'

const initialState = {
    loggedinUser: authService.getLoggedinUser(),
}

export function userReducer(state = initialState, cmd) {
    switch (cmd.type) {
        // User
        case SET_USER:
            return { ...state, loggedinUser: cmd.user }

        default: return state
    }
}