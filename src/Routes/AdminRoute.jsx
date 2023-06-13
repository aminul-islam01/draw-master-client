import { Navigate } from "react-router-dom";
import UseRole from "../hooks/UseRole";

const AdminRoute = ({children}) => {
    const [users, isLoading] = UseRole();
    
    if(isLoading) {
        return <h2>Loading</h2>
    }else if(users.role === 'admin') {
        return children
    }else{
        return <Navigate to="/"></Navigate>
    }
};

export default AdminRoute;