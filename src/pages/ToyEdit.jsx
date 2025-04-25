import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { useState, useEffect, useRef, Fragment } from "react"
import { useParams, useNavigate } from "react-router-dom"

// import { toyService } from '../services/toy.service.js'
import { toyService } from '../services/toy.service.remote.js'

import { toyActions } from "../store/actions/toy.actions.js"
import { useConfirmTabClose } from '../hooks/useConfirmTabClose.js'


import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"

import { ToyLabelsPicker } from "../cmps/ToyLabelsPicker.jsx"
import { Link } from "react-router-dom"
import { Loader } from "../cmps/Loader.jsx"

export function ToyEdit() {
    const params = useParams()
    const { toyId } = params

    const navigate = useNavigate()

    const [toyToEdit, setToyToEdit] = useState({ ...toyService.getEmptyToy() })
    const [toyEditLabels, setToyEditLabels] = useState(null)

    const imageUrlRegex = useRef(/\.(jpeg|jpg|gif|png|webp|bmp|svg)$/i)

    const hasChanges = useRef(false)
    useConfirmTabClose(hasChanges.current)


    useEffect(() => {
        if (toyId) {
            loadToy()
        }
    }, [toyId])

    function loadToy() {
        toyService.get(toyId)
            .then(toy => {
                setToyToEdit(prev => ({ ...prev, ...toy }))
                setToyEditLabels(toy.labels)
            })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot load toy')
            })
    }

    // function handleChange({ target }) {
    //     var { name, value } = target
    //     if (name === 'price') value = +value

    //     setToyToEdit(prev => ({ ...prev, [name]: value }))
    //     // hasChanges.current = true
    // }

    function onSaveLabels(labelsPicked) {
        setToyToEdit(prev => ({ ...prev, labels: labelsPicked }))
        hasChanges.current = true
    }

    function onSave(toyToSave) {
        if (!toyToSave?._id) toyToSave.createdAt = Date.now()

        toyToSave.imgUrl = imageUrlRegex.current.test(toyToSave.imgUrl) ? toyToSave.imgUrl : 'src/assets/img/no img.jpg'

        toyActions.saveToy(toyToSave)
            .then(() => {
                showSuccessMsg('toy saved')
                navigate('/toy')
            })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot save toy')
            })

    }

    const SignupSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        price: Yup.number().required('Price is required').min(0, 'Price must be positive'),
        imgUrl: Yup.string().matches(imageUrlRegex.current, 'Must be a valid image URL')
    })

    if (toyId && !toyToEdit._id) return <Loader />
    return (
        <section className="toy-edit">

            <h2>{toyToEdit._id ? "Edit Toy" : "Add Toy"}</h2>

            {/* <form onSubmit={onSave}>
                <label htmlFor="name">Name:</label>
                <input type="text" name='name' id="name" value={name} onChange={handleChange} required />
                <label htmlFor="name">Price:</label>
                <input type="number" name='price' id="price" value={price || ''} onChange={handleChange} required />
                <label htmlFor="imgUrl">Image Url:</label>
                <input type="text" name='imgUrl' id="imgUrl" value={imgUrl} onChange={handleChange} />
                <span>Labels:</span>
                <ToyLabelsPicker labels={labels} onSaveLabels={onSaveLabels} toyEditLabels={toyEditLabels} />
                <button className="save-btn">Save</button>
                <Link to='/toy'><button>Back to list</button></Link>
            </form> */}


            <Formik
                initialValues={toyToEdit}
                validationSchema={SignupSchema}
                onSubmit={(values) => onSave({ ...values, labels: toyEditLabels })}
            >
                {({ errors, touched }) => (
                    <Form>
                        <div className='lable'>Name:</div>

                        <Field type="text" name="name" id='name' placeholder='Enter toy name' />
                        {errors.name && touched.name && <div className='error-msg'>{errors.name}</div>}

                        <div className='lable'>Price: </div>
                        <Field type="number" name="price" id='price' placeholder='Enter toy price' />
                        {errors.price && touched.price && <div className='error-msg'>{errors.price}</div>}

                        {/* <Field name='price' >
                            {({ field, form }) => (
                                <Fragment>
                                    <input
                                        type="number"
                                        name='price'
                                        id='price'
                                        {...field}
                                        value={field.value || ''}
                                        placeholder="Enter toy price"
                                        onChange={e => form.setFieldValue("price", e.target.value)}
                                    />
                                    {form.errors.price && form.touched.price && (
                                        <div className="error-msg">{form.errors.price}</div>
                                    )}
                                </Fragment>
                            )}

                        </Field> */}

                        <div className='lable'>Image URL: </div>
                        <Field name="imgUrl" id='imgUrl' placeholder='Enter toy image url' />
                        {errors.imgUrl && touched.imgUrl && <div className='error-msg'>{errors.imgUrl}</div>}

                        <div className='form-btns flex justify-between'>
                            <button type='submit' className="save-btn">Save</button>
                            <Link to='/toy'><button>Back to list</button></Link>
                        </div>
                    </Form>
                )}
            </Formik>
        </section>
    )
}

