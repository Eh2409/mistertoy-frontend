import { ToyPreview } from "./ToyPreview.jsx"

export function ToyList({ toys, onRemoveToy }) {
    return (
        <ul className="toy-list">
            {toys.map(toy => {
                return < li key={toy._id} >

                    <ToyPreview toy={toy} />

                    <div className='toy-btns'>
                        <button>Details</button>
                        <button>Edit</button>
                        <button onClick={() => onRemoveToy(toy._id)}>Remove</button>
                    </div>
                </li>
            })}
        </ul>
    )
}