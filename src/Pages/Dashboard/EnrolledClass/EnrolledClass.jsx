import { useEffect } from "react";
import UseAxios from "../../../hooks/UseAxios";
import UseAuth from "../../../hooks/UseAuth";
import { useState } from "react";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { Helmet } from "react-helmet";


const EnrolledClass = () => {
    const [axiosSecure] = UseAxios();
    const {user} = UseAuth();
    const [enrolledClasses, setEnrolledClasses] = useState([]);

    useEffect(() => {
        axiosSecure(`/enrolled-classes?email=${user?.email}`)
        .then(res => setEnrolledClasses(res.data))
    }, [axiosSecure, setEnrolledClasses, user.email]) 

    return (
        <div className="mb-20 px-5">
            <Helmet><title>Draw-master-classes | dashboard-my-enrolled-classes</title></Helmet>
            <SectionTitle subHeading="Classes" heading="My enrolled Classes">
            </SectionTitle>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead className="bg-amber-600 text-lg text-white">
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Class Name</th>
                            <th>Instructor Name</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {enrolledClasses.map((enrolledClass, index) =>
                            <tr key={enrolledClass._id}>
                                <th>{index + 1}</th>
                                <td>
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-16 h-16">
                                            <img src={enrolledClass.image} />
                                        </div>
                                    </div>
                                </td>
                                <td>{enrolledClass.className}</td>
                                <td>{enrolledClass.instructorName}</td>
                                <td>$ {enrolledClass.price}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EnrolledClass;