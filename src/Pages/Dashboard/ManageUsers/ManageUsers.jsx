
import Swal from "sweetalert2";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import UseAxios from "../../../hooks/UseAxios";
import { useQuery } from "@tanstack/react-query";

const ManageUsers = () => {
    const [axiosSecure] = UseAxios();
    const { refetch, data: users = []} = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure('/all-users')
            return res.data;
        }
    })

    const CreateAdmin = (user) => {
        axiosSecure.patch('/user/admin', user)
        .then(res => {
           if(res.status === 200) {
            refetch()
            Swal.fire({
                icon: 'success',
                title: 'Create admin successfully',
                showConfirmButton: false,
                timer: 1500
              })
           }
        })
    }

    const CreateInstructor = (user) => {
        axiosSecure.patch('/user/instructor', user)
        .then(res => {
           if(res.status === 200) {
            refetch()
            Swal.fire({
                icon: 'success',
                title: 'Create instructor successfully',
                showConfirmButton: false,
                timer: 1500
              })
           }
        })
    }

    return (
        <div className="mb-20 px-10">
            <SectionTitle subHeading="Users" heading="Manage All Users">
            </SectionTitle>
            <div className="overflow-x-auto">
                <h2 className="text-xl font-semibold">Total Users: {users.length}</h2>
                <table className="table">
                    {/* head */}
                    <thead className="bg-amber-600 text-lg text-white">
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>User Email</th>
                            <th>Role</th>
                            <th>Action</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) =>
                            <tr key={user._id}>
                                <th>{index + 1}</th>
                                <td>
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-16 h-16">
                                            <img src={user.image} />
                                        </div>
                                    </div>
                                </td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td className="font-bold">{user.role}</td>
                                <td>
                                    <button onClick={()=> CreateInstructor(user)} className="btn btn-primary btn-xs" disabled={user.role === 'instructor' || user.role === 'admin'}>Instructor</button>
                                </td>
                                <td>
                                    <button onClick={()=> CreateAdmin(user)} className="btn btn-primary btn-xs" disabled={user.role === 'admin'}>Admin</button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;