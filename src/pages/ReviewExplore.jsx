import { useState, useEffect, useRef } from "react"
import { useSelector } from 'react-redux'
import { ToyReviews } from "../cmps/ToyReviews"
import { useEffectOnUpdate } from '../hooks/useEffectOnUpdate.js'
import { reviewActions } from "../store/actions/review.actions"
import { Loader } from "../cmps/Loader.jsx"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"



export function ReviewExplore(props) {

    const loggedinUser = useSelector(storeState => storeState.userModule.loggedinUser)
    const reviews = useSelector(storeState => storeState.reviewModule.reviews)
    const isLoad = useSelector(storeState => storeState.toyModule.isLoad)

    useEffect(() => {
        loadReviews()
    }, [])


    async function loadReviews() {
        try {
            await reviewActions.loadReviews()
        } catch (err) {
            console.log('Cannot load reviews:', err)
            showErrorMsg('Cannot load reviews')
        }
    }

    async function onRemoveReview(reviewId) {
        try {
            await reviewActions.removeReview(reviewId)
            showSuccessMsg('Reivew removed')
        } catch (err) {
            console.log('err:', err)
            showErrorMsg('Cannot remove Reivew')
        }
    }

    return (
        <section>
            <h1>Reviews</h1>
            {isLoad ? <Loader />
                : (reviews.length > 0 && <ToyReviews
                    reviews={reviews}
                    loggedinUser={loggedinUser}
                    onRemoveReview={onRemoveReview}
                    isReviewPage={true}
                />)}
        </section>
    )
}