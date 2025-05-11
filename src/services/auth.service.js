import { userService } from "./user.service.js"

export const authService = {
    login,
    signup,
    logout,
    getLoggedinUser,
}

const KEY_LOGGEDIN_USER = 'loggedinUser'

async function login({ username, password }) {
    try {
        const user = await userService.getByUsername(username)
        if (user && user.password === password) return _setLoggedinUser(user)
        else throw new Error('Invalid login')
    } catch (err) {
        console.error('Login failed:', err)
        throw err
    }
}

async function signup(user) {
    console.log('kakapepe:', user)
    try {
        const newUser = await userService.add(user)
        return _setLoggedinUser(newUser)
    } catch (err) {
        console.error('Signup failed:', err)
        throw err
    }
}

async function logout() {
    sessionStorage.removeItem(KEY_LOGGEDIN_USER)
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(KEY_LOGGEDIN_USER))
}

function _setLoggedinUser(user) {
    console.log(user);

    const userToSave = {
        _id: user._id,
        username: user.username,
        fullname: user.fullname,
        isAdmin: user.isAdmin
    }

    console.log('user to save', userToSave);

    sessionStorage.setItem(KEY_LOGGEDIN_USER, JSON.stringify(userToSave))
    return userToSave
}