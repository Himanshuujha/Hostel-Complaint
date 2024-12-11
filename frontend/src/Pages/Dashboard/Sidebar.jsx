import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../Auth/context";
import { HomeIcon, ExclamationCircleIcon, ArrowRightOnRectangleIcon, CursorArrowRaysIcon, WindowIcon } from "@heroicons/react/24/solid";

const SidebarItem = ({ path, icon: Icon, label, activePath, setActivePath }) => {
  const isActive = activePath === path;

  const baseClasses = "relative flex items-center space-x-5 h-10 w-full pl-4 transition-colors duration-200";
  const activeClasses = "text-primaryGreen bg-black bg-opacity-15";
  const inactiveClasses = "text-white hover:text-primaryGreen";

  const getLinkClasses = () => `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`;
  const getPseudoClasses = () => isActive ? "border-l-8 border-primaryGreen rounded-tr-lg rounded-br-lg" : "";

  return (
    <Link to={path} className={getLinkClasses()} onClick={() => setActivePath(path)} aria-current={isActive ? "page" : undefined}>
      <div className={`absolute left-0 h-full w-2 ${getPseudoClasses()}`}></div>
      <Icon className="h-6 w-6" />
      <span>{label}</span>
    </Link>
  );
};

const Sidebar = () => {
  const location = useLocation();
  const [activePath, setActivePath] = useState(location.pathname);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    setActivePath(location.pathname);
  }, [location]);

  const handleLogout = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
    navigate("/auth/sign-in");
    alert("Logout successful");
  };

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <>
      <button onClick={toggleSidebar} className="lg:hidden fixed top-4 left-4 z-50 bg-primaryBlack p-2 rounded-md text-white focus:outline-none">
        {isSidebarOpen ? <WindowIcon className="h-6 w-6" /> : <CursorArrowRaysIcon className="h-6 w-6" />}
      </button>
      <aside className={`w-[16.7%] lg:w-64 bg-primaryBlack fixed top-0 overflow-y-auto h-screen custom-scrollbar flex flex-col justify-between transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 transition-transform duration-300 ease-in-out z-40`}>
        <div className="flex flex-col justify-center space-y-10 w-full mb-4">
          <div className="m-6">
            <img src="https://puchd.ac.in/asset/pu-logo.png" className="h-20 w-20 mb-10" alt="Logo" />
          </div>
          <nav className="space-y-4 flex flex-col items-baseline justify-center w-full">
            <SidebarItem path="/dashboard/members" icon={HomeIcon} label="Members" activePath={activePath} setActivePath={setActivePath} />
            <SidebarItem path="/dashboard/complaints" icon={ExclamationCircleIcon} label="Complaints" activePath={activePath} setActivePath={setActivePath} />
          </nav>
        </div>
        <div className="m-6">
          <button onClick={handleLogout} className="flex items-center space-x-5 text-white hover:text-red-500 transition-colors duration-200 w-full">
            <ArrowRightOnRectangleIcon className="h-6 w-6" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
      {isSidebarOpen && <div onClick={toggleSidebar} className="fixed inset-0 bg-black opacity-50 z-30 lg:hidden"></div>}
    </>
  );
};

export default Sidebar;
