import { useSelector } from 'react-redux'
import { useState, useEffect, useRef } from 'react'
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { reviewActions } from '../store/actions/review.actions.js'
import { ToyReviews } from '../cmps/ToyReviews.jsx'
import { useParams, useNavigate } from "react-router-dom"
import { ImgUploader } from '../cmps/ImgUploader.jsx'
import { userAction } from '../store/actions/user.actions.js'


export function UserDetails() {
    const loggedinUser = useSelector(storeState => storeState.userModule.loggedinUser)
    const reviews = useSelector(storeState => storeState.reviewModule.reviews)

    const [isReviewSet, setIsReviewSet] = useState(false)
    const [newProfileImg, setNewProfileImg] = useState(null)

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

    function onSetNewProfileImg(img) {
        setNewProfileImg(img)
    }

    async function loadReviews(FilterBy) {
        try {
            await reviewActions.loadReviews(FilterBy)
            setIsReviewSet(true)
        } catch (err) {
            console.log('Cannot load reviews:', err)
            showErrorMsg('Cannot load reviews')
        }
    }

    async function pnSaveProfileImg() {
        const userToSave = { ...loggedinUser, profileImg: newProfileImg }
        try {
            await userAction.updateUser(userToSave)
            showSuccessMsg('Profile image saved')
        } catch (err) {
            console.log('err:', err)
            showErrorMsg('Cannot save profile image')
        }
    }

    if (!loggedinUser) return
    return (
        <section className="user-details">
            <h2>{loggedinUser?.fullname}</h2>

            <div className='user-profile-settings flex justify-center align-center'>
                <ImgUploader
                    currImage={loggedinUser?.profileImg}
                    onSaveImage={onSetNewProfileImg}
                />
                {newProfileImg &&
                    <button onClick={pnSaveProfileImg}>Save Profile Image</button>
                }
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