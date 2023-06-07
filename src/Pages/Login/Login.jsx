import { useForm } from 'react-hook-form';

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const handleLogin = data => {
        console.log(data)
    }

    return (
        <div className='my-32'>
            <div className='md:w-1/2 p-10'>
                <form onSubmit={handleSubmit(handleLogin)} className='bg-white p-5 shadow-xl'>
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
                    <div className="form-control mt-6">
                        <button type="submit" className="btn bg-green-600 hover:bg-green-700">Login</button>
                    </div>
                    {/* <input {...register('firstName')} />
                <input {...register('lastName', { required: true })} />
                {errors.lastName && <p>Last name is required.</p>}
                <input {...register('age', { pattern: /\d+/ })} />
                {errors.age && <p>Please enter number for age.</p>} */}
                    {/* <input type="submit" /> */}
                </form>
            </div>
        </div>
    );
};

export default Login;