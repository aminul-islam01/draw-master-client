import Swal from "sweetalert2";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import UseAxios from "../../../hooks/UseAxios";
import UseClasses from "../../../hooks/UseClasses";


const SelectedClass = () => {
    const [selectClasses, refetch] = UseClasses();
    const [axiosSecure] = UseAxios();

    const handleDelete = id => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/delete-classes/${id}`)
                .then(res => {
                    refetch()
                    if(res.status === 200) {
                        Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                          )
                    }
                })
            }
          })
        
    }
   

    return (
        <div className="mb-20 px-5">
            <SectionTitle subHeading="Classes" heading="My Selected Classes">
            </SectionTitle>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead className="bg-amber-600 text-lg text-white">
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Class Name</th>                                           
                            <th>Price</th>
                            <th>Action</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {selectClasses.map((selectedClass, index) =>
                            <tr key={selectedClass._id}>
                                <th>{index + 1}</th>
                                <td>
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-16 h-16">
                                            <img src={selectedClass.image} />
                                        </div>
                                    </div>
                                </td>
                                <td>{selectedClass.className}</td>
                                <td>$ {selectedClass.price}</td>
                                <td>
                                    <button onClick={() => handleDelete(selectedClass._id)} className="btn btn-primary btn-xs">Delete</button>
                                </td>
                                <td>
                                    <button className="btn btn-primary btn-xs">Pay</button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SelectedClass;