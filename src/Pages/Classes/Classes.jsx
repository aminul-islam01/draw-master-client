import { useState } from "react";
import { useEffect } from "react";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import Swal from "sweetalert2";
import UseAuth from "../../hooks/UseAuth";
import UseClasses from "../../hooks/UseClasses";
import { useNavigate } from "react-router-dom";
import UseAxios from "../../hooks/UseAxios";
import axios from "axios";
import { Helmet } from "react-helmet";
import UseRole from "../../hooks/UseRole";

const Classes = () => {
    const [classes, setClasses] = useState([]);
    const {user} = UseAuth();
    const[users] = UseRole();
    const [ , refetch] = UseClasses();
    const [axiosSecure] = UseAxios();
    const navigate = useNavigate();

    useEffect(() => {
        axios('http://localhost:5000/approved-classes')
        .then(res => setClasses(res.data))    
    }, [axiosSecure])

    const handleSelect = (singleClass) => {
        const { _id, className, image, price} = singleClass;
        const selectedClass = {id: _id, email: user?.email, image, className, price}

       {user? axiosSecure.post('/cart-classes', selectedClass)
        .then(data => {
            if(data.data.insertedId) {
                Swal.fire({
                    icon: 'success',
                    title: 'class selected success fully',
                    showConfirmButton: false,
                    timer: 1500
                })
                refetch()
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'This class already selected!',
                  })
            }
        }): navigate('/login')}
    }

    return (
        <div className="mb-20 mt-28">
            <Helmet><title>Draw-master-classes | classes</title></Helmet>
            <SectionTitle subHeading="Classes" heading="All Classes">
            </SectionTitle>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead className=" text-lg text-white">
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
                                    <button onClick={() => handleSelect(singleClass)} className="btn btn-primary btn-xs" disabled={singleClass.availableSeat === 0 || users.role === 'admin' || users.role === 'instructor'}>Select</button>
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