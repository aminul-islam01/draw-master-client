import { Navigate } from "react-router-dom";
import UseRole from "../hooks/UseRole";
import LoadingSpinner from "../Components/LoadingSpinner/LoadingSpinner";

const InstructorRoute = ({children}) => {
    const [users, isLoading] = UseRole();

    if(isLoading){
        return <LoadingSpinner></LoadingSpinner>
    }else if(users.role === 'instructor'){
        return children;
    }else{
        return <Navigate to='/'></Navigate>
    }
};

export default InstructorRoute;