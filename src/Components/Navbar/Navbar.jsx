import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import { FaShoppingCart } from "react-icons/fa";
import UseClasses from "../../hooks/UseClasses";
import UseRole from "../../hooks/UseRole";


const Navbar = () => {
    const { user, logoutUser } = useContext(AuthContext);
    const [selectClasses] = UseClasses();
    const [users] = UseRole();
    

    const navItems = <>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/instructor">Instructors</Link></li>
        <li><Link to="/classes">Classes</Link></li>
        {user ? <><li><Link to={
            users.role ==='instructor' && "/dashboard/instructor-home" || 
            users.role ==='admin' && "/dashboard/admin-home" ||
            users.role ==='student' && "/dashboard/student-home"}>Dashboard</Link></li>
        <li onClick={logoutUser}><Link to="/">Logout</Link></li>
        </> : <li><Link to="/login">Login</Link></li>}
    </>

    return (
        <div className="navbar bg-black bg-opacity-50 fixed top-0 z-10 text-white container mx-auto">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 text-black font-bold">
                        {navItems}
                    </ul>
                </div>
                <Link className="font-bold">DRAW MASTER CLASS</Link>
            </div>
            <div className="navbar-end hidden lg:flex">
                <ul className="menu menu-horizontal px-1 font-bold">
                    {navItems}
                </ul>
            </div>
            {user &&
                <div className="ms-auto">
                   {users.role === 'student' && <label tabIndex={0} className="btn btn-ghost btn-circle">
                        <div className="indicator">
                           <FaShoppingCart className="text-2xl"></FaShoppingCart>
                            <span className="badge badge-sm indicator-item">{selectClasses?.length || 0}</span>
                        </div>
                    </label>}

                    <div className="ms-3 w-10 h-10 overflow-hidden bg-slate-50 rounded-full">
                        <img src={user?.photoURL} />
                    </div>
                </div>
            }
        </div>
    );
};

export default Navbar;