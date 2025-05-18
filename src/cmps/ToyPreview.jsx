import { useState, useEffect, useRef } from 'react'
import { useNavigate } from "react-router-dom"


export function ToyPreview({ toy }) {
    const [isImgLoading, setIsImgLoading] = useState(true)
    const navigate = useNavigate()

    function handleImageLoad() {
        setIsImgLoading(false)
    }

    const { _id, imgUrl, name, price, imgUrls } = toy

    return (
        <section className="toy-preview">
            <div className="toy-img-container" onClick={() => navigate(`/toy/${_id}`)}>
                {isImgLoading && <div className='image-loader'></div>}
                <img
                    src={imgUrls?.length > 0 ? imgUrls[0] : '/src/assets/img/no img.jpg'}
                    alt={imgUrls?.length > 0 ? imgUrls[0] : 'no img'}
                    onLoad={handleImageLoad}
                    style={{ display: isImgLoading ? 'none' : 'block' }}
                />
            </div>
            <div>{name}</div>
            <div>${price}</div>
        </section>
    )
}