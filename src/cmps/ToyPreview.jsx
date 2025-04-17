
export function ToyPreview({ toy }) {
    const { imgUrl, name, price } = toy
    return (
        <section className="toy-preview">
            <img src={imgUrl} alt={imgUrl} />
            <div>{name}</div>
            <div>{price}$</div>
        </section>
    )
}