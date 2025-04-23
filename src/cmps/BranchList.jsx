import { BranchPreview } from "./BranchPreview.jsx"

export function BranchList({ branches }) {
    return (
        <ul className='branches-list'>
            {branches && branches.length > 0 && branches.map((branch) => {
                return <BranchPreview key={branch.phone} branch={branch} />
            })}
        </ul>
    )
}