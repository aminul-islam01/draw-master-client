import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";


const Main = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <h2>footer</h2>
        </div>
    );
};

export default Main;