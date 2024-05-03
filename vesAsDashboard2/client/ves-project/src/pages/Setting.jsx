import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";



const Setting = () => {

    const api = "http://localhost:5000"
    const [selectedFile, setSelectedFile] = useState(null);
    const [message, setMessage] = useState('');

    var userID = window.localStorage.getItem("userID");
    var username = window.localStorage.getItem("username");
    var useremail = window.localStorage.getItem("email");

    const [name, setName] = useState(username)
    const [email, setEmail] = useState(useremail)
    const navigate = useNavigate()

    const handleUpdateSubmit = (e) => {
        e.preventDefault()
        axios.post("http://localhost:5000/updateUser", { userID, name, email })
            .then(result => {
                window.localStorage.setItem("username", name)
                window.localStorage.setItem("email", email)
                window.location.reload();
            })
            .catch(err => console.log(err))
    };



    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!selectedFile) {
            setMessage('Please select an image file to upload');
            return;
        }

        const formData = new FormData();
        formData.append('avatar', selectedFile);
        formData.append('userID', userID);


        try {
            const response = await axios.post(api + '/upload-avatar', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': '/* Add authorization token if required */'
                }
            });

            setMessage(response.data.message);

            if (response.data.message === 'Avatar uploaded successfully') {
                window.localStorage.setItem("avatar", response.data.avatar)
                window.location.reload();
                // Handle successful upload (e.g., update avatar display)
            }
        } catch (err) {
            console.error(err);
            setMessage('Error uploading avatar');
        } finally {
            setSelectedFile(null); // Clear file selection after upload
        }
    };

    return (
        <div className="main-cards d-flex justify-content-start" style={{marginTop:'0px',marginBottom:'auto'}}>
            <div className="card m-2">
                <div className="m-2">
                    <form onSubmit={handleUpdateSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name">
                                <strong>Name</strong>
                            </label>
                            <input type="text"
                                placeholder='Enter Name'
                                autoComplete='off'
                                name='name'
                                defaultValue={username}
                                className='form-control rounded-0'
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email">
                                <strong>Email</strong>
                            </label>
                            <input type="text"
                                placeholder='Enter Email'
                                autoComplete='off'
                                name='email'
                                defaultValue={useremail}
                                className='form-control rounded-0'
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="button2">
                            Update
                        </button>
                    </form>
                </div>
                <div className="m-2">
                    <h1>Upload Avatar</h1>
                    <form onSubmit={handleSubmit}>
                        <input type="file" name="avatar" style={{color:'black'}} accept="image/*" onChange={handleFileChange} required />
                        <button type="submit">Upload</button>
                    </form>
                    <p>{message}</p>
                </div>


            </div>
        </div>
    );
};


export default Setting;