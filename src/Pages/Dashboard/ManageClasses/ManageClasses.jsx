import Swal from "sweetalert2";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import UseAxios from "../../../hooks/UseAxios";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const ManageClasses = () => {
    const [feedbackClass, setFeedbackClass] = useState();
    const [axiosSecure] = UseAxios();
    const { refetch, data: classes = [] } = useQuery({
        queryKey: ['classes'],
        queryFn: async () => {
            const res = await axiosSecure('/all-classes')
            return res.data;
        }
    })

    const handleApproved = approveClass => {
        axiosSecure.patch('/approve-class', approveClass)
            .then(res => {
                if (res.status === 200) {
                    refetch()
                    Swal.fire({
                        icon: 'success',
                        title: 'Approved this class',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
    }

    const handleDeny = denyClass => {
        axiosSecure.patch('/deny-class', denyClass)
            .then(res => {
                if (res.status === 200) {
                    refetch()
                    Swal.fire(
                        'Deny!',
                        'This class Denied.',
                        'success'
                    )
                }
            })
    }

    const handleOpenModal = (feedback) => {
        window.my_modal_4.showModal()
        setFeedbackClass(feedback)
    }
    const handleFeedback = event => {
        const form = event.target;
        const feedbackMessage = form.feedback.value;
        feedbackClass.feedback = feedbackMessage;
        axiosSecure.patch('/feedback-class', feedbackClass)
        .then(res => {
            form.feedback.value = "";
            if (res.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Feedback send successfully',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
    }

    return (
        <div className="mb-20 px-4">
            {/* You can open the modal using ID.showModal() method */}
            {/* <button className="btn" onClick={() => window.my_modal_4.showModal()}>open modal</button> */}
            <dialog id="my_modal_4" className="modal">
                <form onSubmit={handleFeedback} method="dialog" className="modal-box w-11/12 max-w-5xl">
                    <textarea className="w-full p-4 border-2 border-emerald-600" name="feedback" defaultValue={feedbackClass?.feedbac}></textarea>
                    
                    <div className="modal-action">
                        {/* if there is a button, it will close the modal */}
                        <button type="submit" className="btn btn-primary">send feedback</button>
                    </div>
                </form>
            </dialog>
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
                                <td className={singleClass.status === 'approved' ? 'text-green-500' : 'text-red-600'}>{singleClass.status}</td>
                                <td>
                                    <button onClick={() => handleApproved(singleClass)} disabled={
                                        singleClass.status === 'approved' ||
                                        singleClass.status === 'denied'} className="btn btn-primary btn-xs">Approved</button>
                                </td>
                                <td>
                                    <button onClick={() => handleDeny(singleClass)} disabled={
                                        singleClass.status === 'approved' ||
                                        singleClass.status === 'denied'
                                    } className="btn btn-primary btn-xs">Deny</button>
                                </td>
                                <td>
                                    <button onClick={() =>handleOpenModal(singleClass)} className="btn btn-primary btn-xs">Feedback</button>
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