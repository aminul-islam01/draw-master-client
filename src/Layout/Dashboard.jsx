import { Link, NavLink, Outlet } from "react-router-dom";
import { FaBars, FaBook, FaBookOpen, FaCalendarAlt, FaEnvelope, FaHome, FaListUl, FaShoppingBag, FaShoppingCart, FaUserTie, FaUsers, FaUtensils, FaWallet } from 'react-icons/fa';

const Dashboard = () => {
    const user = {role:'admi'};
    return (
        // <div className="drawer drawer-mobile">
        //     <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        //     <div className="drawer-content bg-gray-100">
        //         <Outlet></Outlet>
        //         <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

        //     </div>
        //     <div className="drawer-side">
        //         <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        //         <ul className="menu p-4 w-80 bg-[#D1A054] text-base-content">
        //             {isAdmin ? <>
        //                 <li><NavLink to="/dashboard/admin-home"><FaHome></FaHome>ADMIN HOME</NavLink></li>
        //                 <li><NavLink to="/dashboard/manage-item"><FaListUl></FaListUl>MANAGE CLASSES</NavLink></li>
        //                 <li><NavLink to="/dashboard/all-users"><FaUsers></FaUsers>MANAGE USERS</NavLink></li>
        //             </>
        //                 : <>
        //                     <li><NavLink to="/dashboard/user-home"><FaHome></FaHome>INSTRUCTOR HOME</NavLink></li>
        //                     <li><NavLink to="/dashboard/add-item"><FaUtensils></FaUtensils>ADD CLASS</NavLink></li>
        //                     <li><NavLink to="/dashboard/my-cart"><FaShoppingCart></FaShoppingCart>MY CART</NavLink></li>
        //                 </>
        //             }
        //             <div className="divider"></div>
        //             <li><Link to="/"><FaHome></FaHome>HOME</Link></li>
        //         </ul>
        //     </div>
        // </div>

        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content ">
                {/* Page content here */}                                                     
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
                <Outlet></Outlet>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 h-full bg-yellow-400 text-base-content">
                    {user.role === 'admin' && <> 
                    <li><NavLink to="/dashboard/admin-home"><FaHome></FaHome> ADMIN HOME</NavLink></li>
                    <li><NavLink to="/dashboard/manage-classes"><FaBookOpen></FaBookOpen> MANAGE CLASSES</NavLink></li>
                    <li><NavLink to="/dashboard/manage-users"><FaUsers></FaUsers> MANAGE USERS</NavLink></li>
                    </>}
                    <li><NavLink to="/dashboard/instructor-home"><FaHome></FaHome> INSTRUCTOR HOME</NavLink></li>
                    <li><NavLink to="/dashboard/add-class"><FaBook></FaBook> ADD A CLASS</NavLink></li>
                    <li><NavLink to="/dashboard/my-classes"><FaBookOpen></FaBookOpen> MY CLASSES</NavLink></li>
                    
                    <div className="divider"></div>
                    <li><NavLink to="/"><FaHome></FaHome> HOME</NavLink></li>
                    <li><NavLink to="/instructor"><FaUserTie></FaUserTie> INSTRUCTORS</NavLink></li>
                    <li><NavLink to="/classes"><FaBookOpen></FaBookOpen> CLASSES</NavLink></li>
                </ul>

            </div>
        </div>
    );
};

export default Dashboard;