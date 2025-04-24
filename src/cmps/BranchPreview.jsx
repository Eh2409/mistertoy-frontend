

export function BranchPreview({ branch, branchOpen }) {

    return (

        <li className={`branch-info ${branchOpen.branchId === branch._id ? 'active' : ''}`}>
            <div className='info-content'>
                <div><span>Hours of Operation: </span>{branch.hours}</div>
                <div><span>Phone: </span>{branch.phone}</div>
                <div><span>Address: </span>{branch.address}</div>
            </div>
        </li>
    )
}