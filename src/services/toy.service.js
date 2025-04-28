import { storageService } from "./async-storage.service.js";
import { utilService } from "./util.service.js";

export const toyService = {
    query,
    get,
    remove,
    save,
    getEmptyToy,
    getLabels,
    getDefaultFilter,
    getFilterFromSearchParams
}


const TOYS_KEY = 'TOYS_KEY'
const PAGE_SIZE = 12

_createToys()

window.cs = toyService

function query(filterBy) {
    return storageService.query(TOYS_KEY)
        .then(toys => {

            if (filterBy.name) {
                const regExp = new RegExp(filterBy.name, 'i')
                toys = toys.filter(toy => regExp.test(toy.name))
            }

            if (filterBy.price) {
                toys = toys.filter(toy => toy.price >= filterBy.price)
            }

            if (filterBy.inStock !== undefined) {
                toys = toys.filter(toy => toy.inStock === filterBy.inStock)
            }

            if (filterBy.labels.length > 0) {
                toys = toys.filter(toy => {
                    return toy.labels.some(label => filterBy.labels.includes(label))
                })
            }


            if (filterBy.sortType === 'name') {

                toys = toys.sort((t1, t2) => (t1.name.localeCompare(t2.name)) * filterBy.sortDir)
            }
            if (filterBy.sortType === 'price') {
                toys = toys.sort((t1, t2) => (t1.price - t2.price) * filterBy.sortDir)
            }
            if (filterBy.sortType === 'createdAt') {
                toys = toys.sort((t1, t2) => (t1.createdAt - t2.createdAt) * filterBy.sortDir)
            }

            const maxPageCount = Math.ceil(toys.length / PAGE_SIZE)


            const startIdx = filterBy.pageIdx * PAGE_SIZE
            toys = toys.slice(startIdx, startIdx + PAGE_SIZE)


            return { toys, maxPageCount }
        })
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
function getDefaultFilter() {
    return {
        name: '',
        price: 0,
        labels: [],
        inStock: undefined,
        sortType: 'createdAt',
        sortDir: -1,
        pageIdx: 0
    }
}

function getFilterFromSearchParams(searchParams) {

    const defaultFilterBy = { ...getDefaultFilter() }
    const filterBy = {}

    for (const field in defaultFilterBy) {
        if (field === 'price' || field === 'sortDir' || field === 'pageIdx') {
            filterBy[field] = +searchParams.get(`${field}`) || defaultFilterBy[field]
        } else if (field === 'labels') {
            filterBy[field] = searchParams.getAll('labels') || defaultFilterBy[field]
        } else if (field === 'inStock') {
            var value = searchParams.get('inStock') || defaultFilterBy[field]
            switch (value) {
                case 'true':
                    filterBy[field] = true
                    break;
                case 'false':
                    filterBy[field] = false
                    break;
                case '':
                    filterBy[field] = undefined
                    break;
            }
        } else {
            filterBy[field] = searchParams.get(`${field}`) || defaultFilterBy[field]
        }
    }

    return filterBy
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
    toy.imgUrl = `/src/assets/img/${txt}.jpg`
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