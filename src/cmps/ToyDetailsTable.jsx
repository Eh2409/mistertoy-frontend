
export function ToyDetailsTable({ toy }) {
    const { price, manufacturer, type, brand, releaseYear } = toy
    return (
        <table className="toy-details-table">
            <tbody>
                <tr>
                    <td>Price</td>
                    <td>${price}</td>
                </tr>
                {manufacturer ? <tr>
                    <td>Manufacturer</td>
                    <td>{manufacturer}</td>
                </tr> : null}
                {type.length > 0 ? <tr>
                    <td>Types</td>
                    <td>{type.map((t, idx) => <span key={idx}>{`${t}${type.length - 1 === idx ? '' : ', '}`}</span>)}</td>
                </tr> : null}
                {brand ? <tr>
                    <td>Brand</td>
                    <td>{brand}</td>
                </tr> : null}
                {releaseYear ? <tr>
                    <td>Release Year</td>
                    <td>{releaseYear}</td>
                </tr> : null}
            </tbody>
        </table>
    )
}