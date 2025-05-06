import { httpService } from './http.service.js'

export const toyService = {
    query,
    get,
    remove,
    save,
    getEmptyToy,
    getLabels,
    getDefaultFilter,
    getFilterFromSearchParams,
    getBrands,
    getToyTypes,
    getManufacturers,
    getCahrtsData
}

const BASE_URL = 'toy/'

function query(filterBy) {
    return httpService.get(BASE_URL, filterBy)
}

function get(toyId) {
    return httpService.get(BASE_URL + toyId)
}

function remove(toyId) {
    return httpService.delete(BASE_URL + toyId)
}

function save(toy) {
    const method = toy._id ? 'put' : 'post'
    const toyId = toy._id || ''

    return httpService[method](BASE_URL + toyId, toy)
        .catch(err => {
            console.log(err)
            throw err
        })
}

function getCahrtsData() {
    return httpService.get(BASE_URL + 'charts')
}

function getLabels() {
    console.log('pepe:')
    return httpService.get(BASE_URL + 'labels')
}

// function getLabels() {
//     return ['Dragon Ball Z', 'Goku', 'Anime', 'Vegeta', 'Frieza', 'Piccolo', 'Trunks', 'Android 18']
// }

function getBrands() {
    return [
        'Dragon Ball',
        'One Piece',
        'My Hero Academia',
        'Naruto',
        'Marvel',
        'Pokemon',
        'other'
    ]
}
function getToyTypes() {
    return [
        'Action Figure',
        'S.H.Figuarts',
        'Statue',
        'Building Set',
        'Nanoblock',
        'Keychain',
        'Vinyl Figure',
        'Plush',
        'other'
    ]
}

function getManufacturers() {
    return [
        'Kawada',
        'Funko',
        'Banpresto',
        'Iron Studios',
        'Kidrobot',
        'Bandai',
        'Great Eastern Entertainment',
        'Jazwares Inc',
        'Kotobukiya',
        'other'
    ]
}


function getEmptyToy() {
    return {
        name: '',
        imgUrl: '',
        price: '',
        manufacturer: '',
        type: [],
        brand: '',
        releaseYear: '',
        description: '',
        createdAt: 0,
        inStock: true,
    }
}
function getDefaultFilter() {
    return {
        name: '',
        price: 0,
        manufacturer: [],
        type: [],
        brand: [],
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
        } else if (field === 'manufacturer' || field === 'type' || field === 'brand') {
            filterBy[field] = searchParams.getAll(field) || defaultFilterBy[field]
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

