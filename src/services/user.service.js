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

function query() {
    return storageService.query(USER_KEY)
}

function getById(userId) {
    return storageService.get(USER_KEY, userId)
}

function login({ username, password }) {
    return storageService.query(STORAGE_KEY)
        .then(users => {
            const user = users.find(user => user.username === username)
            if (user && user.password === password) return _setLoggedinUser(user)
            else return Promise.reject('Invalid login')
        })
}


function getByUsername(username) {
    return storageService.query(USER_KEY)
        .then(users => users.find(user => user.username === username))
}

function add(user) {
    const { username, password, fullname } = user
    if (!username || !password || !fullname) return Promise.reject('Missing required fields')

    return getByUsername(username)
        .then(existingUser => {
            if (existingUser) return Promise.reject('Username taken')

            user._id = utilService.makeId()

            return storageService.post(USER_KEY, user)
                .then(user => {
                    delete user.password
                    return user
                })
        })
}

function remove(userId) {
    return storageService.remove(USER_KEY, userId)
}
function save(user) {
    if (user._id) {
        return storageService.put(USER_KEY, user)
    } else {
        return storageService.post(USER_KEY, user)
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
            username: 'muki',
            password: '344366743',
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