import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import SocialLogin from "../../Components/SocialLogin/SocialLogin";
import { Helmet } from "react-helmet";

const Register = () => {
    const { createUser, updateUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState(false);

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = data => {
        const name = data.name;
        const image = data.image;
        const email = data.email;
        const password = data.password;
        const confirmPassword = data.confirmPassword;

        if (password !== confirmPassword) {
            setError(true);
        } else {
            createUser(email, password)
                .then(result => {
                    const registerUser = result.user;
                    updateUser(registerUser, name, image);
                    const user = { name, image, email, role: 'student' }
                    fetch('http://localhost:5000/users', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(user)
                    })
                        .then(res => res.json())
                        .then(() => {
                            navigate('/')
                            Swal.fire({
                                icon: 'success',
                                title: 'User signUp success fully',
                                showConfirmButton: false,
                                timer: 1500
                            })
                            reset()
                        })
                })
        }
    }


    return (
        <div className="min-h-screen bg-base-200 py-32">
            <Helmet><title>Draw-master-classes | register</title></Helmet>
            <div className="md:flex-row-reverse flex-col gap-10">
                <div className="text-center md:w-1/2 lg:text-left">
                    {/* <img src={image} alt="" /> */}
                </div>
                <div className="md:w-1/2 p-10">
                    <div className="shadow-2xl bg-base-100 rounded-md p-5">
                        <form onSubmit={handleSubmit(onSubmit)} >
                            <h2 className='font-bold text-2xl text-center'>Register</h2>
                            <div className="form-control mb-3">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" {...register('name', { required: true })} placeholder="name" className="input input-bordered" />
                                {errors.name && <p className="text-red-700">name is required</p>}
                            </div>
                            <div className="form-control mb-3">
                                <label className="label">
                                    <span className="label-text">Image</span>
                                </label>
                                <input type="text" {...register('image', { required: true })} placeholder="image url" className="input input-bordered" />
                                {errors.image && <p className="text-red-700">image url is required</p>}
                            </div>
                            <div className="form-control mb-3">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" {...register('email', { required: true })} placeholder="email" className="input input-bordered" />
                                {errors.email && <p className="text-red-700">email is required</p>}
                            </div>
                            <div className="form-control mb-3">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="text" {...register('password', {
                                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])/,
                                    minLength: 6,
                                    maxLength: 15,
                                    required: true
                                })} placeholder="password" className="input input-bordered" />
                                {errors.password?.type === 'pattern' && <p className="text-red-700">password must be at less one Capital letter and one special character</p>}
                                {errors.password?.type === 'minLength' && <p className="text-red-700">password must be 6 characters</p>}
                                {errors.password?.type === 'maxLength' && <p className="text-red-700">password must be less then 15 characters</p>}
                            </div>
                            <div className="form-control mb-3">
                                <label className="label">
                                    <span className="label-text">Confirm Password</span>
                                </label>
                                <input type="text" {...register('confirmPassword', { required: true })} placeholder="password" className="input input-bordered" />
                                {error && <p className="text-red-700">password and confirm password are not match</p>}
                            </div>
                            <div className="form-control mt-6">
                                <button type="submit" className="btn bg-green-600 hover:bg-green-700">Register</button>
                            </div>
                            <p className='text-center text-amber-600 mt-4'>Already registered? <Link to="/login" className='font-bold'>Go to log in</Link></p>
                        </form>
                        <SocialLogin></SocialLogin>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;