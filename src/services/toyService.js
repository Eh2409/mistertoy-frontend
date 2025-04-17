import { storageService } from "./async-storage.service.js";
import { utilService } from "./util.service.js";

export const toyService = {
    query,
    get,
    remove,
    save,
    getLabels
}


const TOYS_KEY = 'TOYS_KEY'
_createToys()

window.cs = toyService

function query() {
    return storageService.query(TOYS_KEY)
}
function get(toyId) {
    return storageService.get(TOYS_KEY, toyId)
}
function remove(toyId) {
    return storageService.remove(TOYS_KEY, toyId)
}
function save(toy) {
    if (toy._id) {
        return storageService.put(TOYS_KEY, toy)
    } else {
        return storageService.post(TOYS_KEY, toy)
    }
}

function getLabels() {
    return ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor', 'Battery Powered']
}

function getEmptyToy() {
    return {
        name: '',
        imgUrl: '',
        price: 0,
        labels: [],
        createdAt: 0,
        inStock: true,
    }
}

function _createToys() {
    var toys = utilService.loadFromStorage(TOYS_KEY)
    if (!toys || !toys.length) {
        toys = []
        const txts = ['Hot Wheels Car', 'Barbie', 'Basketball', 'Ship']
        const labels = getLabels()
        for (let i = 0; i < 20; i++) {
            const txt = txts[utilService.getRandomIntInclusive(0, txts.length - 1)];
            const lable = labels[utilService.getRandomIntInclusive(0, labels.length - 1)]
            toys.push(_createToy(txt, lable))
        }
        utilService.saveToStorage(TOYS_KEY, toys)
    }
}

function _createToy(txt, label) {
    const toy = getEmptyToy()
    toy._id = utilService.makeId()
    toy.name = txt
    toy.imgUrl = txt
    toy.price = utilService.getRandomIntInclusive(1, 300)
    toy.labels.push(label)
    toy.createdAt = Date.now()
    return toy
}


// const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle',
//     'Outdoor', 'Battery Powered']
// const toy = {
//     _id: 't101',
//     name: 'Talking Doll',
//     imgUrl: 'hardcoded-url-for-now',
//     price: 123,
//     labels: ['Doll', 'Battery Powered', 'Baby'],
//     createdAt: 1631031801011,
//     inStock: true,
// }