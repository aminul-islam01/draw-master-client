import { Link, useRouteError } from "react-router-dom";
import image from '../../images/error.png'

const Error = () => {
    const {error} = useRouteError();
    return (
        <div className="w-1/2 mx-auto mt-10">
            <img src={image} />
            <p className="text-2xl text-red-500 text-center mt-5">{error.message}</p>
            <div className="text-center mt-4">
            <Link to="/" className="btn btn-primary">Back to home</Link>
            </div>
        </div>
    );
};

export default Error;