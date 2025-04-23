import { useState, useEffect, useRef, Fragment } from 'react'

export function BranchPreview({ branch }) {

    const [isInfoOpen, setIsInfoOpen] = useState(false)

    function toggeleIsInfoOpen() {
        setIsInfoOpen(!isInfoOpen)
    }

    return (
        <Fragment>
            <li className='branch-name flex justify-between' onClick={toggeleIsInfoOpen}>
                <span>{branch.name}</span>
                <span>{isInfoOpen ? '▲' : '▼'}</span>
            </li>
            <li className={`branch-info ${isInfoOpen ? 'active' : ''}`}>
                <div className='info-content'>
                    <div><span>Hours of Operation: </span>{branch.hours}</div>
                    <div><span>Phone: </span>{branch.phone}</div>
                    <div><span>Address: </span>{branch.address}</div>
                </div>
            </li>
        </Fragment>
    )
}