import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { useNavigate } from "react-router-dom";
import { FaGoogle } from 'react-icons/fa';
import Swal from "sweetalert2";


const SocialLogin = () => {
    const { handleGoogleSignIn } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSignIn = () => {
        handleGoogleSignIn()
            .then((result) => {
                const loggedUser = result.user;
                const user = { name: loggedUser?.displayName, image: loggedUser?.photoURL, email: loggedUser?.email, role: 'student' }
                fetch('https://draw-master-class-server.vercel.app/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(user)
                })

                Swal.fire({
                    icon: 'success',
                    title: 'User register success fully',
                    showConfirmButton: false,
                    timer: 1500
                })
                navigate('/')

            })
            .catch((error) => {
                const errorMessage = error.message;
                console.log(errorMessage)
            });
    }

    return (
        <div className='text-center'>
            <div className="divider">OR</div>
            <p className='font-bold mb-2'>sign in with</p>
            <button onClick={handleSignIn} className="btn btn-circle btn-outline btn-primary">
                <FaGoogle></FaGoogle>
            </button>
        </div>
    );
};

export default SocialLogin;