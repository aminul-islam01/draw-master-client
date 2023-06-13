import { Navigate } from "react-router-dom";
import UseRole from "../hooks/UseRole";

const InstructorRoute = ({children}) => {
    const [users, isLoading] = UseRole();

    if(isLoading){
        return <h2>Loading</h2>
    }else if(users.role === 'instructor'){
        return children;
    }else{
        return <Navigate to='/'></Navigate>
    }
};

export default InstructorRoute;