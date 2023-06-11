import { NavLink, Outlet } from "react-router-dom";
import { FaBook, FaBookOpen, FaHome, FaUserTie, FaUsers,  } from 'react-icons/fa';
import UseRole from "../hooks/UseRole";


const Dashboard = () => {
  const [users] = UseRole();

    return (
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
                    {users.role === 'admin' && <> 
                    <li><NavLink to="/dashboard/admin-home"><FaHome></FaHome> ADMIN HOME</NavLink></li>
                    <li><NavLink to="/dashboard/manage-classes"><FaBookOpen></FaBookOpen> MANAGE CLASSES</NavLink></li>
                    <li><NavLink to="/dashboard/manage-users"><FaUsers></FaUsers> MANAGE USERS</NavLink></li>
                    </>}
                    {users.role === 'instructor' && <><li><NavLink to="/dashboard/instructor-home"><FaHome></FaHome> INSTRUCTOR HOME</NavLink></li>
                    <li><NavLink to="/dashboard/add-class"><FaBook></FaBook> ADD A CLASS</NavLink></li>
                    <li><NavLink to="/dashboard/my-classes"><FaBookOpen></FaBookOpen> MY CLASSES</NavLink></li>
                    </>}
                    <li><NavLink to="/dashboard/my-selected-classes"><FaBookOpen></FaBookOpen> MY SELECTED CLASSES</NavLink></li>
                    
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