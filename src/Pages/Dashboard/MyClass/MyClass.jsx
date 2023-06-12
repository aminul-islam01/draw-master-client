import { useState } from "react";
import UseAuth from "../../../hooks/UseAuth";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import UseAxios from "../../../hooks/UseAxios";
import { useEffect } from "react";


const MyClass = () => {
    const {user} = UseAuth();
    const [axiosSecure] = UseAxios();
    
    const [instructorClasses, setInstructorClasses] = useState([]);
    useEffect(()=> {
        axiosSecure(`/instructors-classes?email=${user?.email}`)
        .then(res => setInstructorClasses(res.data))
    }, [axiosSecure, user])
   
    return (
        <div className="mb-20 px-5">
            <SectionTitle subHeading="Classes" heading="My All Classes">
            </SectionTitle>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead className="bg-amber-600 text-lg text-white">
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Class Name</th>
                            <th>Available Seats</th>
                            <th>Enrolled Student</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Action</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {instructorClasses.map((instructorClass, index) =>
                            <tr key={instructorClass._id}>
                                <th>{index + 1}</th>
                                <td>
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-16 h-16">
                                            <img src={instructorClass.image} />
                                        </div>
                                    </div>
                                </td>
                                <td>{instructorClass.className}</td>
                                <td>{instructorClass.availableSeat}</td>
                                <td>{instructorClass.student}</td>
                                <td>$ {instructorClass.price}</td>
                                <td className={instructorClass.status === 'approved'? 'text-green-500': 'text-red-600'}>{instructorClass.status}</td>
                                <td>
                                    <button className="btn btn-primary btn-xs">Update</button>
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

export default MyClass;