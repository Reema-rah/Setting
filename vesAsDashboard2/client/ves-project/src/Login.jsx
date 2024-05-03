import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie'

function Login() {

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()

    const [cookies, setCookies] = useCookies(["access_token"])

    useEffect(() => {
        var userID = window.localStorage.getItem("userID");
        if (userID && userID !== "") {
            navigate(`/Projects`)
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post("http://localhost:5000/login", { email, password })
            .then(result => {
                setCookies("access_token", result.data.token)
            
                if (result.data.message === "Success") {
                    navigate(`/Projects`)
                    setCookies("access_token", result.data.token)
                    window.localStorage.setItem("userID", result.data.userID)
                    window.localStorage.setItem("avatar", result.data.avatar)
                    window.localStorage.setItem("username", result.data.username)
                    window.localStorage.setItem("email", result.data.email)
                } else {
                    alert("You are not registered to this service")
                    navigate("/Signup")
                }

            })
            .catch(err => console.log(err))
    }


    return (

        <div className="d-flex justify-content-center align-items-center bg-secondary " style={{marginTop:'0px',marginBottom:'auto'}}>
            <div className="bg-white p-3 rounded w-25" style={{marginTop:'0px',marginBottom:'auto'}}>
                <h2><center>Login</center></h2>
                <form onSubmit={handleSubmit}>

                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>Email</strong>
                        </label>
                        <input type="text"
                            placeholder='Enter Email'
                            autoComplete='off'
                            name='email'
                            className='form-control rounded-0'
                            onChange={(e) => setEmail(e.target.value)}

                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>Password</strong>
                        </label>
                        <input type="password"
                            placeholder='Enter Password'
                            name='password'
                            className='form-control rounded-0'
                            onChange={(e) => setPassword(e.target.value)}

                        />
                    </div>
                    <button type="submit" className="button2">
                        Login
                    </button>
                </form>
                <p>Dont have an account?</p>
                <Link to="/Signup" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
                    Sign Up
                </Link>

            </div>
        </div>
    );
}

export default Login;