import { uploadService } from '../services/upload.service.js'
import { useState, useEffect, useRef } from "react"

import imageLoader from '/src/assets/img/load.gif'

export function ImgUploader({ onSaveImage, currImage = null }) {

    const [prevImage, setPrevImage] = useState({ imgUrl: null })
    const [isLoading, setIsLoading] = useState(false)
    console.log('prevImage:', prevImage)

    useEffect(() => {
        if (currImage) {
            setPrevImage({ imgUrl: currImage })
        }
    }, [])

    async function uploadImg(ev) {
        ev.preventDefault()

        setIsLoading(true)

        const { secure_url } = await uploadService.uploadImg(ev)
        console.log('Here:', secure_url)

        setPrevImage({ imgUrl: secure_url })
        setIsLoading(false)
        onSaveImage(secure_url)
    }

    return (
        <section className='img-uploader' title='Upload Toy Image'>

            <img
                className='prev-img'
                src={isLoading ? imageLoader : prevImage.imgUrl || '/src/assets/img/profile-img.jpg'}
                alt={prevImage.imgUrl || 'image-upload'}
            />

            <label
                htmlFor="upload-file"
                onDrop={uploadImg}
                onDragOver={(e) => e.preventDefault()}
            >

                <span className='upload-image-btn'>{prevImage.imgUrl ? "Change Image" : "Upload Image"}</span>

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