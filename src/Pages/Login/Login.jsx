import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Provider/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SocialLogin from '../../Components/SocialLogin/SocialLogin';
import { Helmet } from 'react-helmet';

const Login = () => {
    const { register, handleSubmit, formState: { errors }, } = useForm();
    const [captchaCode, setCaptchaCode] = useState();
    const { loginUser } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || "/";

    useEffect(() => {
        loadCaptchaEnginge(6);

    }, []);


    const handleLogin = data => {
        const email = data.email;
        const password = data.password;
        if (validateCaptcha(captchaCode) == true) {
            loginUser(email, password)
                .then(() => {
                    navigate(from, { replace: true });
                    Swal.fire({
                        icon: 'success',
                        title: 'User login success full',
                        showConfirmButton: false,
                        timer: 1500
                    })
                })
                .catch(error => {
                    console.log(error)
                })
        }
        else {
            Swal.fire({
                icon: 'error',
                title: 'Captcha not match',
                showConfirmButton: false,
                timer: 1500
            })
        }
    }

    return (
        <div className='my-32 bg-gray-100'>
            <Helmet><title>Draw-master-classes | login</title></Helmet>
            <div className='md:w-1/2 p-10'>
                <div className='bg-white p-5 shadow-xl rounded-md'>
                    <form onSubmit={handleSubmit(handleLogin)} >
                        <h2 className='font-bold text-2xl text-center'>Login</h2>
                        <div className="form-control mb-5">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type='email' {...register('email', { required: true })} placeholder="email" className="input input-bordered" />
                            {errors.email && <p className='text-red-600'>email is required.</p>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" {...register('password', { required: true })} placeholder="password" className="input input-bordered" />
                            {errors.password && <p className='text-red-600'>password is required.</p>}
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <LoadCanvasTemplate />
                            </label>
                            <input onChange={() => setCaptchaCode(event.target.value)} type="text" placeholder="Type the text above" className="input input-bordered" required />
                        </div>
                        <div className="form-control mt-6">
                            <button type="submit" className="btn bg-green-600 hover:bg-green-700">Login</button>
                        </div>
                        <p className='text-center text-amber-600 mt-4'>New here? <Link to="/register" className='font-bold'>Create a New Account</Link></p>
                    </form>
                    <SocialLogin></SocialLogin>
                </div>
            </div>
        </div>
    );
};

export default Login;