import { useSelector } from 'react-redux'
import { useState, useEffect, useRef } from 'react'
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { reviewActions } from '../store/actions/review.actions.js'
import { ToyReviews } from '../cmps/ToyReviews.jsx'
import { useParams, useNavigate } from "react-router-dom"

export function UserDetails() {
    const loggedinUser = useSelector(storeState => storeState.userModule.loggedinUser)
    const reviews = useSelector(storeState => storeState.reviewModule.reviews)
    const [isReviewSet, setIsReviewSet] = useState(false)

    const navigate = useNavigate()

    const params = useParams()
    const { userId } = params

    useEffect(() => {
        if (userId && userId === loggedinUser?._id) {
            loadReviews({ byUserId: loggedinUser._id })
        } else {
            showErrorMsg('You are not authorized to access this page.')
            navigate('/')
        }
    }, [])

    async function loadReviews(FilterBy) {
        try {
            await reviewActions.loadReviews(FilterBy)
            setIsReviewSet(true)
        } catch (err) {
            console.log('Cannot load reviews:', err)
            showErrorMsg('Cannot load reviews')
        }
    }

    if (!loggedinUser) return
    return (
        <section className="user-details">
            <h2>{loggedinUser?.fullname}</h2>

            <div className='user-settings'>

            </div>

            <h2>My Reviews</h2>

            {isReviewSet && reviews?.length > 0 ?
                <ToyReviews
                    reviews={reviews}
                    loggedinUser={loggedinUser}
                    isReviewPage={true}
                />
                : <div className='no-review-msg'>
                    You haven't written a review for one of the toys yet.
                </div>
            }

        </section>
    )
}