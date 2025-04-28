
import { useNavigate } from "react-router-dom"


export function ToyPreview({ toy }) {
    const navigate = useNavigate()

    const { _id, imgUrl, name, price } = toy
    return (
        <section className="toy-preview">
            <div className="toy-img-container" onClick={() => navigate(`/toy/${_id}`)}>
                <img src={imgUrl} alt={imgUrl} />
            </div>
            <div>{name}</div>
            <div>${price}</div>
        </section>
    )
}