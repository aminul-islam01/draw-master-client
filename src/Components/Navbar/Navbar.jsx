import { Link } from "react-router-dom";


const Navbar = () => {

    const navItems = <>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/instructor">Instructors</Link></li>
        <li><Link>Classes</Link></li>
        <li><Link>Dashboard</Link></li>
        <li><Link to="/login">Login</Link></li>
    </>

    return (
        <div className="navbar bg-black bg-opacity-50 fixed top-0 z-10 text-white container mx-auto">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 text-black">
                        {navItems}
                    </ul>
                </div>
                <Link className="font-bold">DRAW MASTER CLASS</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navItems}
                </ul>
            </div>
            <div className="ms-auto w-10 h-10 overflow-hidden bg-slate-50 rounded-full">
                <img src="https://scontent.fdac68-2.fna.fbcdn.net/v/t39.30808-6/345637573_3471271046467565_4598599078050683555_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeF8MXNWL3LW07sov-yIAWL0DGYUC87nlrAMZhQLzueWsBK4ejUILjwkCbjyNJm3hjbTHY9Lr0hE6vCuKhLN_hy-&_nc_ohc=og1DBLrDW8oAX9_KMKE&_nc_zt=23&_nc_ht=scontent.fdac68-2.fna&oh=00_AfByhIctH1KMXaoptNjGK8fZZyNyhi5u7Td3zLwSImhLGw&oe=64871EA7" />
            </div>
        </div>
    );
};

export default Navbar;