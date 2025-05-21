import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { useState, useEffect, useRef, Fragment } from "react"
import { useParams, useNavigate } from "react-router-dom"
import TextField from '@mui/material/TextField';
import { useSelector } from 'react-redux'

// import { toyService } from '../services/toy.service.js'
import { toyService } from '../services/toy.service.remote.js'

import { toyActions } from "../store/actions/toy.actions.js"
import { useConfirmTabClose } from '../hooks/useConfirmTabClose.js'


import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"

// import { ToyLabelsPicker } from "../cmps/ToyLabelsPicker.jsx"
import { Link } from "react-router-dom"
import { Loader } from "../cmps/Loader.jsx"
import { ToyLabelsPickerUi } from '../cmps/ToyLabelsPickerUi.jsx'
import { ToySelectUi } from '../cmps/ToySelectUi.jsx';
import { ToyImgUploader } from '../cmps/ToyImgUploader.jsx';

export function ToyEdit() {
    const params = useParams()
    const { toyId } = params

    const navigate = useNavigate()

    const [toyToEdit, setToyToEdit] = useState({ ...toyService.getEmptyToy() })
    const toysLabels = useSelector(storeState => storeState.toyModule.labels)


    const imageUrlRegex = useRef(/\.(jpeg|jpg|gif|png|webp|bmp|svg)$/i)

    // const hasChanges = useRef(false)
    // useConfirmTabClose(hasChanges.current)

    useEffect(() => {
        onLoadLabels()
    }, [])

    useEffect(() => {
        if (toyId) {
            loadToy()
        }
    }, [toyId])

    async function onLoadLabels() {
        try {
            await toyActions.loadLabels()
        } catch (err) {
            console.log('err:', err)
            showErrorMsg('Cannot load labels')
        }
    }

    async function loadToy() {
        try {
            const toy = await toyService.get(toyId)
            setToyToEdit(prev => ({ ...prev, ...toy }))
        } catch (err) {
            console.log('err:', err)
            showErrorMsg('Cannot load toy')
        }
    }


    async function onSave(toyToSave) {
        toyToSave.imgUrl = imageUrlRegex.current.test(toyToSave.imgUrl) ? toyToSave.imgUrl : '/src/assets/img/no img.jpg'

        try {
            await toyActions.saveToy(toyToSave)
            showSuccessMsg('toy saved')
            navigate('/toy')
        } catch (err) {
            console.log('err:', err)
            showErrorMsg('Cannot save toy')
        }
    }

    const SignupSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        price: Yup.number().required('Price is required').min(0, 'Price must be positive'),
        imgUrl: Yup.string().matches(imageUrlRegex.current, 'Must be a valid image URL'),
        releaseYear: Yup.number().required('Release Year is required')
            .min(1970, 'The release year must be no earlier than 1970')
            .max(new Date().getFullYear(), `Enter a valid year up to the current year`),
        brand: Yup.string().required('brand is required'),
    })

    function setLabelName(name) {
        switch (name) {
            case 'imgUrl':
                return 'Image URL'
            case 'releaseYear':
                return 'Release year'
            default:
                break;
        }

        return name.charAt(0).toUpperCase() + name.slice(1)
    }

    function customInput(props) {
        return <TextField
            {...props}
            label={setLabelName(props.name)}
            value={props.value}
        />
    }

    if (toyId && !toyToEdit._id || Object.keys(toysLabels).length <= 0) return <Loader />

    return (
        <section className="toy-edit">

            <h2>{toyToEdit._id ? "Edit Toy" : "Add Toy"}</h2>

            <Formik
                initialValues={toyToEdit}
                validationSchema={SignupSchema}
                onSubmit={(values) => onSave(values)}
            >

                {({ errors, touched, values }) => {
                    return (< Form >

                        <Field as={customInput} type="text" name="name" id='name' placeholder='Enter toy name' />
                        {errors.name && touched.name && <div className='error-msg'>{errors.name}</div>}


                        <Field as={customInput} type="number" name="price" id='price' placeholder='Enter toy price' />
                        {errors.price && touched.price && <div className='error-msg'>{errors.price}</div>}

                        <Field as={customInput} type="text" name="description" id='description' placeholder='Enter toy description' />
                        {/* {errors.description && touched.description && <div className='error-msg'>{errors.description}</div>} */}

                        <Field as={customInput} type="number" name="releaseYear" id='releaseYear' placeholder='Enter toy release year' />
                        {errors.releaseYear && touched.releaseYear && <div className='error-msg'>{errors.releaseYear}</div>}


                        {/* <Field as={customInput} name="imgUrl" id='imgUrl' placeholder='Enter toy image url' />
                        {errors.imgUrl && touched.imgUrl && <div className='error-msg'>{errors.imgUrl}</div>} */}


                        <Field name="manufacturer" id='manufacturer'>
                            {({ field, form }) => (
                                <Fragment>
                                    < ToySelectUi
                                        name='Manufacturers'
                                        options={toysLabels.manufacturers}
                                        select={field.value}
                                        onSaveSelect={(labels) => { form.setFieldValue(field.name, labels) }}
                                    />
                                </Fragment>
                            )}
                        </Field >

                        <Field name="type" id='type'>
                            {({ field, form }) => (
                                <Fragment>
                                    < ToyLabelsPickerUi
                                        name='Types'
                                        options={toysLabels.types}
                                        labels={field.value}
                                        onSaveLabels={(labels) => { form.setFieldValue(field.name, labels) }}
                                    />
                                </Fragment>
                            )}
                        </Field >

                        <Field name="brand" id='brand'>
                            {({ field, form }) => (
                                <Fragment>
                                    < ToySelectUi
                                        name='Brands'
                                        options={toysLabels.brands}
                                        select={field.value}
                                        onSaveSelect={(labels) => { form.setFieldValue(field.name, labels) }}
                                    />
                                </Fragment>
                            )}
                        </Field >
                        {errors.brand && touched.brand && <div className='error-msg'>{errors.brand}</div>}

                        <Field name="imgUrls" id='imgUrls'>
                            {({ field, form }) => (
                                <Fragment>
                                    <ToyImgUploader
                                        name='imgUrls'
                                        onSaveImage={(imgs) => { form.setFieldValue(field.name, imgs) }}
                                        currImages={field.value}
                                    />
                                </Fragment>
                            )}
                        </Field >

                        <div className='form-btns flex justify-between'>
                            <button type='submit' className="save-btn">Save</button>
                            <Link to='/toy'><button>Back to list</button></Link>
                        </div>

                    </Form>)
                }}
            </Formik>
        </section >
    )
}


