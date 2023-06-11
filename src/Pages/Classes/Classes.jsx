import { useState } from "react";
import { useEffect } from "react";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import axios from "axios";
import Swal from "sweetalert2";
import UseAuth from "../../hooks/UseAuth";

const Classes = () => {
    const [classes, setClasses] = useState([]);
    const {user} = UseAuth();

    useEffect(() => {
        fetch('http://localhost:5000/classes')
            .then(res => res.json())
            .then(data => setClasses(data))
    }, [])

    const handleSelect = (singleClass) => {
        const { _id, className, image, price} = singleClass;
        const selectedClass = {id: _id, email: user?.email, image, className, price}

        axios.post('http://localhost:5000/cart-classes', selectedClass)
        .then(data => {
            if(data.data.insertedId) {
                Swal.fire({
                    icon: 'success',
                    title: 'class selected success fully',
                    showConfirmButton: false,
                    timer: 1500
                })
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'This class already selected!',
                  })
            }
        })
    }

    return (
        <div className="mb-20 mt-28">
            <SectionTitle subHeading="Classes" heading="All Classes">
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
                            <th>Available Seats</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {classes.map((singleClass, index) =>
                            <tr key={singleClass._id}>
                                <th>{index + 1}</th>
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
                                <td>
                                    <button onClick={() => handleSelect(singleClass)} className="btn btn-primary btn-xs">Select</button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Classes;