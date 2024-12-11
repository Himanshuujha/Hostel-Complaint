import React, { useState } from 'react';
import { Routes, Route, useLocation } from "react-router-dom";


import { EyeIcon } from '@heroicons/react/24/solid';
import Members from '../Members/member';
import Complaints from '../Complaints/complaints';
import Sidebar from '../Sidebar';
import Header from '../Header';

const routes = [
  {
    layout: "dashboard",
    pages: [
      { name: "Members", path: "/members", element: <Members /> },
      { name: "Complaints", path: "/complaints/*", element: <Complaints /> },
    ],
  },
];

const getHeading = (path) => {
  switch (path) {
    case '/members':
      return 'Members';
    case '/complaints/*':
      return 'Complaints';
    case '/registerIssue':
      return 'Register Issue';
    default:
      return 'Dashboard';
  }
};

export function Dashboard() {
  const location = useLocation();
  const heading = getHeading(location.pathname);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-primaryBlack">
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 bg-secondaryBlack p-2 rounded-md text-white focus:outline-none"
      >
        <EyeIcon className="h-6 w-6" />
      </button>
      <div className={`lg:block ${isSidebarOpen ? 'block' : 'hidden'} lg:static fixed z-40`}>
        <Sidebar />
      </div>
      {isSidebarOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black opacity-50 z-30 lg:hidden"
        ></div>
      )}
      <div className="lg:ml-64 flex-1 flex flex-col">
        <Header heading={heading} />
        <div className="p-4 lg:p-6">
          <Routes>
            {routes.map(({ layout, pages }) => 
              layout === "dashboard" &&
              pages.map(({ path, element }) => (
                <Route key={path} exact path={path} element={element} />
              ))
            )}
          </Routes>
        </div>
      </div>
    </div>
  );
}

Dashboard.displayName = "Dashboard";

export default Dashboard;
