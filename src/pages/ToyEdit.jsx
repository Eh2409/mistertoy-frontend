import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { useState, useEffect, useRef, Fragment } from "react"
import { useParams, useNavigate } from "react-router-dom"
import TextField from '@mui/material/TextField';


// import { toyService } from '../services/toy.service.js'
import { toyService } from '../services/toy.service.remote.js'

import { toyActions } from "../store/actions/toy.actions.js"
import { useConfirmTabClose } from '../hooks/useConfirmTabClose.js'


import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"

// import { ToyLabelsPicker } from "../cmps/ToyLabelsPicker.jsx"
import { Link } from "react-router-dom"
import { Loader } from "../cmps/Loader.jsx"
import { ToyLabelsPickerUi } from '../cmps/ToyLabelsPickerUi.jsx'

export function ToyEdit() {
    const params = useParams()
    const { toyId } = params

    const navigate = useNavigate()

    const [toyToEdit, setToyToEdit] = useState({ ...toyService.getEmptyToy() })


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
            })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot load toy')
            })
    }


    function onSave(toyToSave) {

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

    function customInput(props) {
        // console.log('Here:', props)
        return <TextField
            {...props}
            label={props.name.charAt(0).toUpperCase() + props.name.slice(1)}
            value={props.value}
        />
    }

    if (toyId && !toyToEdit._id) return <Loader />

    return (
        <section className="toy-edit">

            <h2>{toyToEdit._id ? "Edit Toy" : "Add Toy"}</h2>

            <Formik
                initialValues={toyToEdit}
                validationSchema={SignupSchema}
                onSubmit={(values) => onSave(values)}
            >

                {({ errors, touched, values }) => {
                    console.log('Formik values:', values)
                    return (< Form >

                        <Field as={customInput} type="text" name="name" id='name' placeholder='Enter toy name' />
                        {errors.name && touched.name && <div className='error-msg'>{errors.name}</div>}


                        <Field as={customInput} type="number" name="price" id='price' placeholder='Enter toy price' />
                        {errors.price && touched.price && <div className='error-msg'>{errors.price}</div>}


                        <Field as={customInput} name="imgUrl" id='imgUrl' placeholder='Enter toy image url' />
                        {errors.imgUrl && touched.imgUrl && <div className='error-msg'>{errors.imgUrl}</div>}

                        <Field name="labels" id='labels'>
                            {({ field, form }) => (
                                <Fragment>
                                    < ToyLabelsPickerUi
                                        labels={field.value}
                                        onSaveLabels={(labels) => { form.setFieldValue(field.name, labels) }}
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

