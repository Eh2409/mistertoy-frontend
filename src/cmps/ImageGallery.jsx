import { useState, useEffect } from "react"

export function ImageGallery({ images, children }) {

    const [selectedImg, setSelectedImg] = useState(null)
    const [isImgLoading, setIsImgLoading] = useState(true)

    useEffect(() => {
        if (images?.length > 0) {
            setSelectedImg(images[0])
        }
    }, [])

    function handleImageLoad() {
        setIsImgLoading(false)
    }

    function onSelectImage(img) {
        setSelectedImg(img)
    }

    return (
        <section className="image-gallery">

            <div className="selected-img img-container">
                {isImgLoading && <div className="image-loader"></div>}
                <img
                    src={selectedImg || '/src/assets/img/no img.jpg'}
                    alt={selectedImg || 'no img'}
                    onLoad={handleImageLoad}
                    style={{ display: isImgLoading ? 'none' : 'block' }}
                />
                {children}
            </div>

            <ul className="image-selector flex">
                {images.length > 0 && images.map((img, idx) => {
                    return <li className={`img-container ${selectedImg === img ? "selected" : ""}`} key={idx} onClick={() => onSelectImage(img)}>
                        {isImgLoading && <div className="image-loader"></div>}
                        <img
                            src={img || '/src/assets/img/no img.jpg'}
                            alt={img || 'no img'}
                            onLoad={handleImageLoad}
                            style={{ display: isImgLoading ? 'none' : 'block' }}
                        />
                    </li>
                })}
            </ul>

        </section>
    )
}