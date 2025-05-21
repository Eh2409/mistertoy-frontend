
export function ToyReviews({ reviews, loggedinUser, onRemoveReview }) {
    return (
        <section className="toy-reviews">

            <ul className="reviews-list">
                {reviews.length > 0 ? reviews.map(review => {
                    return <li className="review-item" key={review._id}>
                        <div className="review-header flex align-center justify-between ">
                            <span>By: {review.byUser.fullname}</span>
                            {loggedinUser?.isAdmin &&
                                <button onClick={() => { onRemoveReview(review._id) }}>X</button>}
                        </div>
                        <pre className="review-txt">{review.txt}</pre>
                    </li>
                })
                    : <li className="review-item no-review">This toy has not yet been reviewed.</li>
                }
            </ul>
        </section>
    )
}