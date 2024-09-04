import React, { useEffect, useState } from 'react'

export default function AddUser() {

    const [user, setUsers] = useState({
        name :"",
        userName :"",
        email: ""
    });

    const{name, userName , email} = user

    const onInputChange =(e) =>{
        setUsers({...user, [e.target.name]: e.target.value})
    }

  return (
    <div className='container'>
        <div className='row'>
            <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                <h2 className='text-center m-4 '>Register User</h2>
                <div className='mb-3'>
                    <label htmlFor='Name' className='form-label'>
                        Name
                    </label>
                    <input 
                        type={"text"}
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
                        type={"text"}
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
                        type={"text"}
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
                <button type='submit' className='btn btn-outline-danger'>
                    Cancel
                </button>
            </div>

        </div>

    </div>
  )
}
