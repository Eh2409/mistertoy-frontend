import { useState, useEffect, useRef } from 'react'
import { reviewService } from '../services/review.service.remote.js'

export function ReviewAdd({ onSaveReview }) {
    const [reviewToAdd, setReviewToAdd] = useState({ ...reviewService.getEmptyReview() })

    const defaultReview = useRef({ ...reviewService.getEmptyReview() })

    function handleChange({ target }) {
        setReviewToAdd(prev => ({ ...prev, txt: target.value }))
    }
    function onAddReview(ev) {
        ev.preventDefault()
        onSaveReview(reviewToAdd)
        setReviewToAdd(defaultReview.current)
    }

    return (
        <form onSubmit={onAddReview} className='review-add'>
            <textarea
                type="text" name="txt"
                value={reviewToAdd.txt}
                onChange={handleChange}
                placeholder='Add review'
            />
            <button>Add Review</button>
        </form>
    )
}