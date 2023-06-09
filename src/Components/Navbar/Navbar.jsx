import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";


const Navbar = () => {
    const { user, logoutUser, handleGoogleSignIn } = useContext(AuthContext);
   
    const navItems = <>
        <li><Link to="/">Home</Link></li>
        <li onClick={handleGoogleSignIn}><Link to="/">google</Link></li>
        <li><Link to="/instructor">Instructors</Link></li>
        <li><Link>Classes</Link></li>
        <li><Link>Dashboard</Link></li>
       {user? <li onClick={logoutUser}><Link to="/">Logout</Link></li>
       :<li><Link to="/login">Login</Link></li>}
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
            { user &&
                <div className="ms-auto w-10 h-10 overflow-hidden bg-slate-50 rounded-full">
                    <img src={user?.photoURL} />
                </div>
            }
        </div>
    );
};

export default Navbar;