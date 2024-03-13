import React from "react";
import { Link, useLocation } from "react-router-dom";
import { GearSix, SignOut } from "@phosphor-icons/react";
import { useAuth } from "../Login/AuthProvider";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const { login, logoutHandler } = useAuth();
  const navigate = useNavigate()
  const location = useLocation();

  const handleLogOut = () => {
    logoutHandler()
    navigate('/')
  }
  return (
    <div className="grid grid-cols-smallBig p-8 pb-4 rounded-b-xl">
      <p className="text-red-500 text-2xl font-bold">
        Zi<span className="text-logoYellow text-2xl font-bold">ggi</span>fy
      </p>
      <div className="flex justify-end text-right">
        <Link
          to="/dashboard"
          className={
            login
              ? location.pathname === "/dashboard"
                ? "border-b-2  border-red-500 mr-16"
                : "border-b-2 border-transparent mr-16"
              : "cursor-not-allowed border-b-2 border-transparent mr-16"
          }
        >
          <p className="mt-1">Dashboard</p>
        </Link>
        <Link
          to="/inventory"
          className={
            login
              ? location.pathname === "/inventory"
                ? "border-b-2  border-red-500 mr-16"
                : "border-b-2 border-transparent mr-16"
              : "cursor-not-allowed border-b-2 border-transparent mr-16"
          }
        >
          <p className="mt-1">Live Inventory</p>
        </Link>
        <Link
          to="/reports"
          className={
            login
              ? location.pathname === "/reports"
                ? "border-b-2  border-red-500 mr-16"
                : "border-b-2 border-transparent mr-16"
              : "cursor-not-allowed border-b-2 border-transparent mr-16"
          }
        >
          <p className="mt-1">Reports</p>
        </Link>
        <Link
          to="/vendors"
          className={
            login
              ? location.pathname === "/vendors"
                ? "border-b-2  border-red-500 mr-16"
                : "border-b-2 border-transparent mr-16"
              : "cursor-not-allowed border-b-2 border-transparent mr-16"
          }
        >
          <p className="mt-1">Vendors</p>
        </Link>
        <GearSix className={login ? 'mr-16 cursor-pointer' : 'cursor-not-allowed mr-16'} size={32} onClick={() => navigate('/settings')} />
        <SignOut className="cursor-pointer" size={32} onClick={handleLogOut}/>
      </div>
    </div>
  );
};

export default Header;
