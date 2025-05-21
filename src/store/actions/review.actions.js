
// import { reviewService } from '../../services/toy.service.js'
import { reviewService } from '../../services/review.service.remote.js'

import { store } from '../store.js'
import { SET_LOADER } from "../reducers/toy.reducer.js"
import { SET_REVIEWS, REMOVE_REVIEW, ADD_REVIEW } from "../reducers/review.reducer.js"

export const reviewActions = {
    loadReviews,
    removeReview,
    saveReview,
}

async function loadReviews(filterBy) {
    store.dispatch({ type: SET_LOADER, isLoad: true })
    try {
        const reviews = await reviewService.query(filterBy)
        store.dispatch({ type: SET_REVIEWS, reviews })
    } catch (err) {
        console.log('review actions => Cannot load reviews:', err)
        throw err
    }
    finally {
        setTimeout(() => {
            store.dispatch({ type: SET_LOADER, isLoad: false })
        }, 350)
    }
}


async function removeReview(reviewId) {
    try {
        await reviewService.remove(reviewId)
        store.dispatch({ type: REMOVE_REVIEW, reviewId })
    } catch (err) {
        console.log('review actions => Cannot remove review:', err)
        throw err
    }
}

async function saveReview(review) {
    try {
        const reviewToSave = await reviewService.save(review)
        store.dispatch({ type: ADD_REVIEW, review: reviewToSave })
    } catch (err) {
        console.log('review actions => Cannot save review:', err)
        throw err
    }
}


