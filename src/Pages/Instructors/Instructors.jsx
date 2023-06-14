import { useState } from "react";
import { useEffect } from "react";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import { Helmet } from "react-helmet";


const Instructors = () => {
    const [instructors, setInstructors] = useState([]);
    useEffect(() => {
        fetch('https://draw-master-class-server.vercel.app/instructors')
            .then(res => res.json())
            .then(data => setInstructors(data))
    }, [])

    return (
        <div className="mb-20 mt-28">
            <Helmet><title>Draw-master-classes | instructors</title></Helmet>
            <SectionTitle subHeading="Instructors" heading="All Instructors">
            </SectionTitle>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead className="bg-amber-600 text-xl text-white">
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {instructors.map((instructor, index) =>
                            <tr key={instructor._id}>
                                <th>{index +1}</th>
                                <td>
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-16 h-16">
                                            <img src= {instructor.image} />
                                        </div>
                                    </div>
                                </td>
                                <td>{instructor.name}</td>
                                <td>{instructor.email}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Instructors;