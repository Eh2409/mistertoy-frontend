import { uploadService } from '../services/upload.service.js'
import { useState, useEffect, useRef } from "react"

import imageLoader from '/src/assets/img/load.gif'

export function ToyImgUploader({ onSaveImage, currImages = null }) {

    const [savedImages, setSavedImages] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (currImages) {
            setSavedImages([...currImages])
        }
    }, [])

    useEffect(() => {
        onSaveImage(savedImages)
    }, [savedImages])

    async function uploadImg(ev) {
        ev.preventDefault()

        setIsLoading(true)

        const uploadedImagesData = await uploadService.uploadImgs(ev)

        const newImages = uploadedImagesData.reduce((acc, data) => {
            const { secure_url } = data
            acc.push(secure_url)
            return acc
        }, [])

        console.log('images:', newImages)

        setSavedImages(prev => ([...prev, ...newImages]))
        setIsLoading(false)

    }

    function onRemoveImg(imgIdxToRemove) {
        const filteredImages = savedImages.filter((_, idx) => idx !== imgIdxToRemove)
        setSavedImages(filteredImages)
    }

    return (
        <section className='toy-img-uploader'>

            <label
                className='upload-image-btn'
                htmlFor="upload-file"
                onDrop={uploadImg}
                onDragOver={(e) => e.preventDefault()}
            >
                <span>Upload Images</span>

                <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="upload-file"
                    type="file"
                    onChange={uploadImg}
                    multiple
                />
            </label>

            <div className='images flex'>
                {savedImages.length > 0 &&
                    savedImages.map((img, idx) => {
                        return <div className='new-image-container' key={idx}>
                            <img
                                className='new-image'
                                src={img}
                                alt={img}
                            />
                            <button type='button' className='remove-img' onClick={() => { onRemoveImg(idx) }}>x</button>
                        </div>
                    })
                }

                {isLoading && <img
                    className='new-image-loader'
                    src={imageLoader}
                    alt='image-upload'
                />}
            </div>
        </section >
    )
}