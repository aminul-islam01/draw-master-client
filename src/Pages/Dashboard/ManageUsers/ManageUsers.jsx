import { useEffect } from "react";
import { useState } from "react";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";

const ManageUsers = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/all-users')
        .then(res => res.json())
        .then(data => setUsers(data))
    }, [])

    return (
        <div className="mb-20 px-10">
            <SectionTitle subHeading="Users" heading="All Users">
            </SectionTitle>
            <div className="overflow-x-auto">
                <h2 className="text-xl font-semibold">Total Users: {users.length}</h2>
                <table className="table">
                    {/* head */}
                    <thead className="bg-amber-600 text-lg text-white">
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>User Email</th>
                            <th>Role</th>
                            <th>Action</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) =>
                            <tr key={user._id}>
                                <th>{index + 1}</th>
                                <td>
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-16 h-16">
                                            <img src={user.image} />
                                        </div>
                                    </div>
                                </td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td className="font-bold">{user.role}</td>
                                <td>
                                    <button className="btn btn-primary btn-xs" disabled={user.role === 'instructor' || user.role === 'admin'}>Instructor</button>
                                </td>
                                <td>
                                    <button className="btn btn-primary btn-xs" disabled={user.role === 'admin'}>Admin</button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;