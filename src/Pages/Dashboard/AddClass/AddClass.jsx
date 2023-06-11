import { useForm } from "react-hook-form";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import UseAuth from "../../../hooks/UseAuth";
import Swal from "sweetalert2";
import UseAxios from "../../../hooks/UseAxios";
import { useState } from "react";

const AddClass = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { user } = UseAuth();
    const [axiosSecure] = UseAxios();
    const [pending, setPending] = useState(false);

    const image_hosting_api_key = import.meta.env.VITE_image_hosting_api_key;
    const image_hosting_url = `https://api.imgbb.com/1/upload?key=${image_hosting_api_key}`

    const onSubmit = data => {
        setPending(true)
        const availableSeat = parseInt(data.availableSeat);
        const price = parseInt(data.price);
        const student = parseInt(0)
        const status = "pending"
        const {className, instructorName, instructorEmail} = data;
        // console.log(data)
        const formData = new FormData();
        formData.append('image', data.image[0]);

        fetch(image_hosting_url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imageResponse => {
                console.log(imageResponse)
                if (imageResponse.success) {
                    const image = imageResponse.data.display_url;
                    
                    const newClass = {className, image, instructorName, instructorEmail, availableSeat, student, price, status}
                    
                    axiosSecure.post('/classes', newClass)
                        .then(data => {
                            if (data.data.insertedId) {
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Added an item successfully',
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                                reset()
                                setPending(false)
                            }
                        })
                }
            })
    }

    return (
        <div className="p-10">
            <SectionTitle subHeading="Add Class" heading="Add a Class Here">
            </SectionTitle>
            <div className="shadow-2xl bg-base-100 rounded-md p-5">
                <form onSubmit={handleSubmit(onSubmit)} >
                    <div className="md:flex gap-5 mb-3">
                        <div className="w-full form-control">
                            <label className="label">
                                <span className="label-text">Class Name</span>
                            </label>
                            <input type="text" {...register('className', { required: true })} placeholder="name" className="input input-bordered" />
                            {errors.className && <p className="text-red-700">class name is required</p>}
                        </div>
                        <div className="w-full form-control">
                            <label className="label">
                                <span className="label-text">Class Image</span>
                            </label>
                            <input type="file" {...register('image', { required: true })} placeholder="image url" />
                            {errors.image && <p className="text-red-700">image url is required</p>}
                        </div>
                    </div>
                    <div className="md:flex gap-5 mb-3">
                        <div className="w-full form-control">
                            <label className="label">
                                <span className="label-text">Instructor Name</span>
                            </label>
                            <input type="text" {...register('instructorName', { required: true })} defaultValue={user?.displayName} readOnly className="input input-bordered" />
                        </div>
                        <div className="w-full form-control">
                            <label className="label">
                                <span className="label-text">Instructor Email</span>
                            </label>
                            <input type="text" {...register('instructorEmail', { required: true })} defaultValue={user?.email} readOnly className="input input-bordered" />
                        </div>
                    </div>
                    <div className="md:flex gap-5 mb-3">
                        <div className="w-full form-control">
                            <label className="label">
                                <span className="label-text">Available Seat</span>
                            </label>
                            <input type="number" {...register('availableSeat', { required: true })} placeholder="Available Seat" className="input input-bordered" />
                            {errors.availableSeat && <p className="text-red-700">available seat is required</p>}
                        </div>
                        <div className="w-full form-control">
                            <label className="label">
                                <span className="label-text">Price</span>
                            </label>
                            <input type="number" {...register('price', { required: true })} placeholder="Price" className="input input-bordered" />
                            {errors.price && <p className="text-red-700">Price is required</p>}
                        </div>
                    </div>
                    <div className="form-control mt-6">
                        <button disabled={pending} type="submit" className="btn bg-green-600 hover:bg-green-700">Add Now</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddClass;