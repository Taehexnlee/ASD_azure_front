import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function AddUser() {

    let navigate = useNavigate();
    const [user, setUsers] = useState({
        name: "",
        userName: "",
        email: ""
    });

    const { name, userName, email } = user;

    const onInputChange = (e) => {
        setUsers({ ...user, [e.target.name]: e.target.value });
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:8080/user", user);
        navigate("/");
    }

    const onCancel = () => {
        navigate("/"); // Redirects to the home page or any desired route
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h2 className='text-center m-4'>Register User</h2>

                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className='mb-3'>
                            <label htmlFor='Name' className='form-label'>
                                Name
                            </label>
                            <input
                                type="text"
                                className='form-control'
                                placeholder='Enter your name'
                                name='name'
                                value={name}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='userName' className='form-label'>
                                User Name
                            </label>
                            <input
                                type="text"
                                className='form-control'
                                placeholder='Enter your username'
                                name='userName'
                                value={userName}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='email' className='form-label'>
                                E-Mail
                            </label>
                            <input
                                type="text"
                                className='form-control'
                                placeholder='Enter your e-mail'
                                name='email'
                                value={email}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <button type='submit' className='btn btn-outline-primary'>
                            Submit
                        </button>
                        <button type='button' className='btn btn-outline-danger' onClick={onCancel}>
                            Cancel
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}