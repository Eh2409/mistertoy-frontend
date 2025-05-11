import { storageService } from "./async-storage.service.js";
import { utilService } from "./util.service.js";

export const userService = {
    query,
    getById,
    getByUsername,
    add,
    remove,
    save,
    getEmptyCredentials
}

const USER_KEY = 'USER_KEY'
_createUsers()

async function query() {
    const users = await storageService.query(USER_KEY)
    return users
}

async function getById(userId) {
    const user = await storageService.get(USER_KEY, userId)
    return user
}

async function getByUsername(username) {
    const users = await storageService.query(USER_KEY)
    const user = users.find(user => user.username === username)
    return user
}

async function add(user) {
    const { username, password, fullname } = user
    if (!username || !password || !fullname) {
        throw new Error('Missing required fields')
    }

    try {
        const existingUser = await getByUsername(username)
        if (existingUser) throw new Error('Username taken')

        user._id = utilService.makeId()
        const savedUser = await storageService.post(USER_KEY, user)
        delete savedUser.password
        return savedUser

    } catch (err) {
        console.error('Failed to add user:', err)
        throw err
    }
}

async function remove(userId) {
    const res = await storageService.remove(USER_KEY, userId)
    return res
}

async function save(user) {
    if (user._id) {
        const savedUser = await storageService.put(USER_KEY, user)
        return savedUser
    } else {
        const savedUser = await storageService.post(USER_KEY, user)
        return savedUser
    }
}

function getEmptyCredentials() {
    return {
        username: '',
        password: '',
        fullname: '',
        isAdmin: false
    }
}

function _createUsers() {
    let users = utilService.loadFromStorage(USER_KEY)
    if (users && users.length > 0) return

    users = [
        {
            username: 'e33',
            password: '333',
            fullname: 'muki maka',
            _id: "a11",
            isAdmin: true
        },
        {
            username: 'puki',
            password: 'cv345',
            fullname: 'puki nuki',
            _id: "a12",
            isAdmin: false
        },
        {
            username: 'shuki',
            password: '2345f',
            fullname: 'shuki shaka',
            _id: "a13",
            isAdmin: false
        },
    ]
    utilService.saveToStorage(USER_KEY, users)
}