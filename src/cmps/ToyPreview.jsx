
export function ToyPreview({ toy }) {
    const { imgUrl, name, price } = toy
    return (
        <section className="toy-preview">
            <div className="toy-img-container">
                <img src={imgUrl} alt={imgUrl} />
            </div>
            <div>{name}</div>
            <div>${price}</div>
        </section>
    )
}