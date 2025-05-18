import { uploadService } from '../services/upload.service.js'
import { useState, useEffect, useRef } from "react"

import imageLoader from '/src/assets/img/load.gif'

export function ImgUploader({ onSaveImage, currImage = null }) {

    const [prevImage, setPrevImage] = useState({ imgUrl: null })
    const [isLoading, setIsLoading] = useState(false)
    console.log('Here:', prevImage)

    useEffect(() => {
        if (currImage) {
            setPrevImage({ imgUrl: currImage })
        }
    }, [])

    async function uploadImg(ev) {
        ev.preventDefault()

        setIsLoading(true)

        const { secure_url } = await uploadService.uploadImg(ev)

        setPrevImage({ imgUrl: secure_url })
        setIsLoading(false)
        onSaveImage(secure_url)
    }

    return (
        <section className='img-uploader' title='Upload Toy Image'>
            <label
                htmlFor="upload-file"
                onDrop={uploadImg}
                onDragOver={(e) => e.preventDefault()}
            >
                <img
                    className='image-upload-btn'
                    src={isLoading ? imageLoader : prevImage.imgUrl || '/src/assets/img/image-upload.png'}
                    alt={prevImage.imgUrl || 'image-upload'}
                />

                <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="upload-file"
                    type="file"
                    onChange={uploadImg}

                />
            </label>
        </section>
    )
}