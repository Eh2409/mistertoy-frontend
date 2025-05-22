import { Link } from "react-router-dom"
import { utilService } from "../services/util.service.js"

export function ToyReviews({ reviews, loggedinUser, onRemoveReview, isReviewPage = false }) {
    console.log('re:', reviews)
    return (
        <section className="toy-reviews">

            <ul className={`reviews-list ${isReviewPage ? 'grid-layout' : ''}`}>
                {reviews.length > 0 ? reviews.map(review => {
                    return <li className="review-item" key={review._id}>
                        <div className="review-header flex align-center justify-between ">
                            <div className="author-details">
                                <span>By: {review.byUser.fullname}</span>
                                {isReviewPage &&
                                    <span>About Toy:
                                        <Link to={`/toy/${review.aboutToy._id}`}>{review.aboutToy.name}</Link>
                                    </span>}

                            </div>
                            {loggedinUser?.isAdmin &&
                                <button onClick={() => { onRemoveReview(review._id) }}>X</button>}
                        </div>
                        <pre className="review-txt">
                            <span>{review.txt}</span>
                            <div className="review-created-at">{utilService.formatCreatedAtDate(review.createdAt)}</div>
                        </pre>
                    </li>
                })
                    : <li className="review-item no-review">This toy has not yet been reviewed.</li>
                }
            </ul>
        </section>
    )
}