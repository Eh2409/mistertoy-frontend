import { ToyPreview } from "./ToyPreview.jsx"

import { Link } from "react-router-dom"

export function ToyList({ toys, onRemoveToy }) {
    return (
        <ul className="toy-list">
            {toys.map(toy => {
                return < li key={toy._id} >

                    <ToyPreview toy={toy} />

                    <div className='toy-btns'>
                        <Link to={`/toy/${toy._id}`}> <button>Details</button></Link>
                        <Link to={`/toy/edit/${toy._id}`}><button>Edit</button></Link>
                        <button onClick={() => onRemoveToy(toy._id)}>Remove</button>
                    </div>
                </li>
            })}
        </ul>
    )
}