import { BranchPreview } from "./BranchPreview.jsx"

import { useState, useEffect, useRef, Fragment } from 'react'

export function BranchList({ branches }) {

    const [branchOpen, setBranchOpen] = useState({ branchId: null })


    function onToggleBranch(branchId) {
        setBranchOpen(prev => {
            if (branchOpen.branchId === branchId) {
                prev = ({ ...prev, branchId: null })
            } else {
                prev = ({ ...prev, branchId: branchId })
            }
            return prev
        })
    }

    return (
        <ul className='branches-list'>
            {branches && branches.length > 0 && branches.map((branch) => {
                return <Fragment key={branch._id}>
                    <li className='branch-name flex justify-between' onClick={() => onToggleBranch(branch._id)}>
                        <span>{branch.name}</span>
                        <span>{branchOpen.branchId === branch._id ? '▲' : '▼'}</span>
                    </li>
                    <BranchPreview branch={branch} branchOpen={branchOpen} />
                </Fragment>
            })}
        </ul>
    )
}