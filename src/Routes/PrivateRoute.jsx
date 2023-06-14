import { Navigate, useLocation } from "react-router-dom";
import UseAuth from "../hooks/UseAuth";
import LoadingSpinner from "../Components/LoadingSpinner/LoadingSpinner";

const PrivateRoute = ({ children }) => {
    const { user, loading } = UseAuth();
    const location = useLocation();

    if (loading) {
        return <LoadingSpinner></LoadingSpinner>
    } else if (user) {
        return children
    } else {
        return <Navigate to="/login" state={{ from: location }} replace></Navigate>
    }

};

export default PrivateRoute;