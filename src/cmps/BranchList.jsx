import { BranchPreview } from "./BranchPreview.jsx"

import { useState, useEffect, useRef, Fragment } from 'react'

export function BranchList({ branches, onsetCenterToBranch }) {

    const [branchOpen, setBranchOpen] = useState(null)


    function onToggleBranch(branchId, branchCenter) {
        setBranchOpen(prev => {
            if (branchOpen === branchId) {
                prev = null
                onsetCenterToBranch({ lat: 31.4461, lng: 34.8516, zoom: 7 })
            } else {
                prev = branchId
                onsetCenterToBranch({ ...branchCenter, zoom: 10 })
            }
            return prev
        })
    }

    return (
        <ul className='branches-list'>
            {branches && branches.length > 0 && branches.map((branch) => {
                return <Fragment key={branch._id}>
                    <li className={`branch-name flex justify-between ${branchOpen === branch._id ? 'active' : ''}`} onClick={() => onToggleBranch(branch._id, branch.center)}>
                        <span>{branch.name}</span>
                        <span>{branchOpen === branch._id ? '▲' : '▼'}</span>
                    </li>
                    <BranchPreview branch={branch} branchOpen={branchOpen} />
                </Fragment>
            })}
        </ul>
    )
}