import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom';

export default function Home() {

    const [users, setUsers] = useState([]);
    const {id} = useParams()

    useEffect(() => {
        loadUser();
    }, [])

    const loadUser = async () => {
        const result = await axios.get("http://localhost:8080/users");
        setUsers(result.data);  // assuming result.data is the array of users
    }

    const deleteUser = async (id) => {
        await axios.delete(`http://localhost:8080/user/${id}`);
        loadUser();
    }

    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">First</th>
                        <th scope="col">Last</th>
                        <th scope="col">Handle</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={user.id}> {/* Adding the unique key here */}
                            <th scope="row">{index + 1}</th>
                            <td>{user.name}</td>
                            <td>{user.userName}</td>
                            <td>{user.email}</td>
                            <td>
                                <Link className='btn btn-primary mx-2' to={`/viewuser/${user.id}`}>View</Link>
                                <Link className='btn btn-outline-primary mx-2' to={`/edituser/${user.id}`}>Edit</Link>
                                <button className='btn btn-danger mx-2' onClick={() => deleteUser(user.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
