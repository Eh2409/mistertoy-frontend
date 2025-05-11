import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { useState, useEffect, useRef, Fragment } from "react"
import TextField from '@mui/material/TextField';


import { authService } from "../services/auth.service.js"
import { userService } from "../services/user.service.js"
import { userAction } from "../store/actions/user.actions.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"


export function LoginSignup({ isSignup, onToggleIsSignup, onTogglePopup }) {

    const [isloading, setIsloading] = useState(false)
    const [credentials, setCredentials] = useState(userService.getEmptyCredentials())

    function onSubmit(credentials) {
        isSignup ? signin(credentials) : login(credentials)
    }

    function toggleIsLoading(value) {
        setIsloading(value)
    }

    async function login(credentials) {
        toggleIsLoading(true)
        try {
            await userAction.login(credentials)
            showSuccessMsg('Logged in successfully')
            onTogglePopup()
        } catch (err) {
            console.log(err)
            showErrorMsg(`Couldn't login...`)
        } finally {
            toggleIsLoading(false)
        }
    }

    async function signin(credentials) {
        toggleIsLoading(true)
        try {
            await userAction.signup(credentials)
            showSuccessMsg('Signed in successfully')
            onTogglePopup()
        } catch (err) {
            console.log(err)
            showErrorMsg(`Couldn't signup...`)
        } finally {
            toggleIsLoading(false)
        }
    }

    const SignupSchema = Yup.object().shape({
        username: Yup.string().required('Username is required'),
        password: Yup.string().required('Password is required'),
        fullname: Yup.string().when([], {
            is: () => isSignup,
            then: schema => schema.required('Full Name is required'),
            otherwise: schema => schema.notRequired()
        }),
    })

    function setLabelName(name) {
        return name.charAt(0).toUpperCase() + name.slice(1)
    }

    function customInput(props) {
        return <TextField
            {...props}
            label={setLabelName(props.name)}
            value={props.value}
        />
    }

    return (
        <section className="login-signup">

            <Formik
                initialValues={credentials}
                validationSchema={SignupSchema}
                onSubmit={onSubmit}
            >

                {({ errors, touched, values }) => {
                    // console.log('Formik values:', values)
                    return (< Form >

                        <Field as={customInput} type="text" name="username" id='username' placeholder='Enter username' />
                        {errors.username && touched.username && <div className='error-msg'>{errors.username}</div>}

                        <Field as={customInput} type="text" name="password" id='password' placeholder='Enter password' />
                        {errors.password && touched.password && <div className='error-msg'>{errors.password}</div>}

                        {isSignup &&
                            <Fragment>
                                <Field as={customInput} type="text" name="fullname" id='fullname' placeholder='Enter fullname' />
                                {errors.fullname && touched.fullname && <div className='error-msg'>{errors.fullname}</div>}
                            </Fragment>
                        }


                        <button type='submit'>{isloading ?
                            <div className='custom-loader '></div>
                            : (isSignup ? 'Signup' : 'Login')}
                        </button>

                        <a href="#" onClick={onToggleIsSignup}>
                            {isSignup
                                ? 'Already have an account? Log in here.'
                                : 'New to the site? Create an account now.'}
                        </a>
                    </Form>)
                }}

            </Formik>
        </section >
    )
}