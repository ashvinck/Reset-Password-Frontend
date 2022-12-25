import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from "yup";
import { useNavigate, useParams } from 'react-router-dom';
import { API } from './Global';
import "./AuthCard.css";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

// Formik Validations for React Input for password & confirmPassword
const formValidationSchema = yup.object({
    password: yup
        .string()
        .min(8, "Password must be at least 8 characters")
        .max(15, "Character limit exceeded")
        .required("Please enter your password")
        .matches(/\d/, "Password must contain atleast one number")
        .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain atleast one special character"),

    confirmPassword: yup
        .string()
        .required("Please confirm your password")
        .oneOf([yup.ref("password"), null], "Passwords doesnot match")
})

// Reset password function
const ResetPassword = () => {
    const { _id, token } = useParams();
    const [data, setData] = useState("");
    const navigate = useNavigate();

    // Fetch data from API to check if user exists
    const getInfo = () => {
        fetch(`${API}/auth/reset-password/${_id}/${token}`, {
            method: "GET",
        })
            .then(res => res.json())
            .then((data) => setData(data))
    }

    useEffect(() => {
        getInfo()
    }, [])

    // Formik function to handleSubmit
    const formik = useFormik({
        initialValues: {
            password: "",
            confirmPassword: "",
        },
        validationSchema: formValidationSchema,
        onSubmit: (reset) => {
            console.log("onsubmit", reset);
            resetpassword(reset)
        }
    })

    // Fetch to POST data to API and display response through React Toastify
    const resetpassword = (reset) => {
        const id = toast.loading("Please wait...")
        console.log("resetpassword", reset)
        fetch(`${API}/auth/reset-password/${_id}/${token}`, {
            method: "POST",
            body: JSON.stringify(reset),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => { toast.update(id, { render: data.message, type: (data.message === "Reset password successfull.Please Login") ? "success" : "error", isLoading: false, autoClose: 5000, }) })
            .then(() => {
                setTimeout(() => {
                    navigate("/login")
                }, 6000)
            })
            .catch((err) => {
                toast(err.message)
            })

    }




    return (
        <div className='ResetPassword container-lg'>
            <div className='forgotPassword container-lg'>
                {/* Toastify */}
                <ToastContainer />
                <div className="container-lg">
                    <div className="Auth mx-auto col">
                        <div className="card">
                            {/* Heading */}
                            <div className='card-heading'>React Authentication</div>
                            {/* Logo */}
                            <img className="logo" src="/logo192.png" alt='applogo' />
                            {/* Card Body */}
                            <div className='cardbody'>
                                <div className='form-wrapper col'>
                                    <form onSubmit={formik.handleSubmit} className='form'>
                                        <p>Reset Password for {data.email}</p>
                                        <div className="form-floating">
                                            <input type="password" className="form-control" id="password" placeholder="Password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                            <p className='error'>{formik.touched.password && formik.errors.password ? formik.errors.password : ''}</p>
                                            <label>Password</label>
                                        </div>
                                        <div className="form-floating">
                                            <input type="confirmPassword" className="form-control" id="confirmPassword" placeholder="Confirm Password" value={formik.values.confirmPassword} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                                            <p className='error'>{formik.touched.confirmPassword && formik.errors.confirmPassword ? formik.errors.confirmPassword : ''}</p>
                                            <label>Confirm Password</label>
                                        </div>
                                        <button type="submit" className="button1">Reset Password</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword