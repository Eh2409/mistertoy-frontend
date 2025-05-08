
// import { toyService } from '../../services/toy.service.js'
import { toyService } from '../../services/toy.service.remote.js'

import { store } from '../store.js'
import { SET_TOYS, REMOVE_TOY, ADD_TOY, UPDATE_TOY, SET_LOADER, SET_MAX_PAGE_COUNT, SET_LABELS } from "../reducers/toy.reducer.js"

export const toyActions = {
    loadToys,
    removeToy,
    saveToy,
    loadLabels
}

async function loadToys(filterBy) {
    store.dispatch({ type: SET_LOADER, isLoad: true })
    try {
        const { toys, maxPageCount } = await toyService.query(filterBy)
        store.dispatch({ type: SET_TOYS, toys })
        store.dispatch({ type: SET_MAX_PAGE_COUNT, maxPageCount })
    } catch (err) {
        console.log('toy actions => Cannot load toys:', err)
        throw err
    } finally {
        setTimeout(() => {
            store.dispatch({ type: SET_LOADER, isLoad: false })
        }, 350)
    }
}


async function removeToy(toyId) {
    try {
        const { maxPageCount } = await toyService.remove(toyId)
        store.dispatch({ type: REMOVE_TOY, toyId: toyId })
        store.dispatch({ type: SET_MAX_PAGE_COUNT, maxPageCount })
    } catch (err) {
        console.log('toy actions => Cannot remove toy:', err)
        throw err
    }
}

async function saveToy(toy) {
    const type = toy._id ? UPDATE_TOY : ADD_TOY
    try {
        const toyToSave = await toyService.save(toy)
        store.dispatch({ type, toy: toyToSave })
    } catch (err) {
        console.log('toy actions => Cannot save toy:', err)
        throw err
    }
}

async function loadLabels() {
    try {
        const labels = await toyService.getLabels()
        store.dispatch({ type: SET_LABELS, labels })
    } catch (err) {
        console.log('toy actions => Cannot load labels:', err)
        throw err
    }
}

