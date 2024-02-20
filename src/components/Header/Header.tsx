import React from "react";
import { Link, useLocation } from "react-router-dom";
import { GearSix, SignOut } from "@phosphor-icons/react";

const Header: React.FC = () => {
  const location = useLocation();
  return (
    <div className="grid grid-cols-smallBig p-8 pb-4 rounded-b-xl">
      <p className="text-red-500 text-2xl font-bold">
        Zig<span className="text-logoYellow text-2xl font-bold">gi</span>fy
      </p>
      <div className="flex justify-end text-right">
        <Link
          to="/"
          className={
            location.pathname === "/"
              ? "border-b-2  border-red-500 mr-16"
              : "border-b-2 border-transparent mr-16"
          }
        >
          <p className="mt-1">Dashboard</p>
        </Link>
        <Link
          to="/inventory"
          className={
            location.pathname === "/inventory"
              ? "border-b-2  border-red-500 mr-16"
              : "border-b-2 border-transparent mr-16"
          }
        >
          <p className="mt-1">Live Inventory</p>
        </Link>
        <Link
          to="/reports"
          className={
            location.pathname === "/reports"
              ? "border-b-2  border-red-500 mr-16"
              : "border-b-2 border-transparent mr-16"
          }
        >
          <p className="mt-1">Reports</p>
        </Link>
        <Link
          to="/vendors"
          className={
            location.pathname === "/vendors"
              ? "border-b-2  border-red-500 mr-16"
              : "border-b-2 border-transparent mr-16"
          }
        >
          <p className="mt-1">Vendors</p>
        </Link>
        <GearSix className="mr-16" size={32} />
        <SignOut size={32} />
      </div>
    </div>
  );
};

export default Header;
