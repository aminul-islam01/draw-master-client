import { useForm } from "react-hook-form";
import { useState } from "react";
import UseAxios from "../../../hooks/UseAxios";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import { useEffect } from "react";


const UpdateClass = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [axiosSecure] = UseAxios();
    const [pending, setPending] = useState(false);
    const { id } = useParams();
    const [updateClass, setUpdateClass] = useState([]);
    
    const { className, image, availableSeat, price, instructorName, instructorEmail } = updateClass;

    useEffect(() => {
        axiosSecure(`/class/${id}`)
        .then(res => setUpdateClass(res.data))
    }, [axiosSecure, id])

    const onSubmit = data => {
        setPending(true)
        const updateSeat = parseInt(data.availableSeat);
        const updatePrice = parseInt(data.price);
        

        axiosSecure.patch(`/class/${id}`, {updateSeat, updatePrice})
            .then(res => {
                if (res.data.acknowledged) {
                    reset()
                    Swal.fire({
                        icon: 'success',
                        title: 'Update a class successfully',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    setPending(false)
                }
            })

    }

    return (
        <div className="p-10">
            <SectionTitle subHeading="Update Class" heading="Update Class Here">
            </SectionTitle>
            <div className="shadow-2xl bg-base-100 rounded-md p-5">
                <form onSubmit={handleSubmit(onSubmit)} >
                    <div className="md:flex gap-5 mb-3">
                        <div className="w-full form-control">
                            <label className="label">
                                <span className="label-text">Class Name</span>
                            </label>
                            <input type="text" {...register('className')} placeholder={className} className="input input-bordered" readOnly />
                        </div>
                        <div className="w-full form-control">
                            <label className="label">
                                <span className="label-text">Class Image</span>
                            </label>
                            <input type="text" {...register('image')} defaultValue={image} readOnly className="input input-bordered" />
                        </div>
                    </div>
                    <div className="md:flex gap-5 mb-3">
                        <div className="w-full form-control">
                            <label className="label">
                                <span className="label-text">Instructor Name</span>
                            </label>
                            <input type="text" {...register('instructorName')} defaultValue={instructorName} readOnly className="input input-bordered" />
                        </div>
                        <div className="w-full form-control">
                            <label className="label">
                                <span className="label-text">Instructor Email</span>
                            </label>
                            <input type="text" {...register('instructorEmail')} defaultValue={instructorEmail} readOnly className="input input-bordered" />
                        </div>
                    </div>
                    <div className="md:flex gap-5 mb-3">
                        <div className="w-full form-control">
                            <label className="label">
                                <span className="label-text">Available Seat</span>
                            </label>
                            <input type="number" {...register('availableSeat', { required: true })} placeholder={availableSeat} className="input input-bordered" />
                            {errors.availableSeat && <p className="text-red-700">available seat is required</p>}
                        </div>
                        <div className="w-full form-control">
                            <label className="label">
                                <span className="label-text">Price</span>
                            </label>
                            <input type="number" {...register('price', { required: true })} placeholder={price} className="input input-bordered" />
                            {errors.price && <p className="text-red-700">Price is required</p>}
                        </div>
                    </div>
                    <div className="form-control mt-6">
                        <button disabled={pending} type="submit" className="btn bg-green-600 hover:bg-green-700">Update Now</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateClass;