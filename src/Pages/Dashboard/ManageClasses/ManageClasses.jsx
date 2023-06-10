import { useState } from "react";
import { useEffect } from "react";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";

const ManageClasses = () => {
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/all-classes')
            .then(res => res.json())
            .then(data => setClasses(data))
    }, [])

    return (
        <div className="mb-20 px-4">
            <SectionTitle subHeading="Classes" heading="Mange All Classes">
            </SectionTitle>
            <div className="overflow-x-auto">
            <h2 className="text-xl font-semibold">Total Classes: {classes.length}</h2>
                <table className="table">
                    {/* head */}
                    <thead className="bg-amber-600 text-md text-white">
                        <tr>
                            <th>Image</th>
                            <th>Class Name</th>
                            <th>Instructor Name</th>
                            <th>Available Seats</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Action</th>
                            <th>Action</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {classes.map(singleClass =>
                            <tr key={singleClass._id}>
                                <td>
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-16 h-16">
                                            <img src={singleClass.image} />
                                        </div>
                                    </div>
                                </td>
                                <td>{singleClass.className}</td>
                                <td>{singleClass.instructorName}</td>
                                <td>{singleClass.availableSeat}</td>
                                <td>$ {singleClass.price}</td>
                                <td className={singleClass.status === 'approved'? 'text-green-500': 'text-red-600'}>{singleClass.status}</td>
                                <td>
                                    <button disabled={
                                    singleClass.status === 'approved' ||
                                    singleClass.status === 'denied'} className="btn btn-primary btn-xs">Approved</button>
                                </td>
                                <td>
                                    <button disabled={
                                    singleClass.status === 'approved' ||
                                    singleClass.status === 'denied'
                                    } className="btn btn-primary btn-xs">Deny</button>
                                </td>
                                <td>
                                    <button className="btn btn-primary btn-xs">Feedback</button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageClasses;