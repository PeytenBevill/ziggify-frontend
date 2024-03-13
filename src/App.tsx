import React from "react";
import { Route, Routes } from "react-router";
import Header from "./components/Header/Header";
import Dashboard from "./components/Dashboard/Dashboard";
import { Inventory } from "./components/Inventory/Inventory";
import Vendors from "./components/Vendors/Vendors";
import Reports from "./components/Reports/Reports";
import Login from "./components/Login/Login"
import { AuthProvider } from "./components/Login/AuthProvider";
import NewUser from "./components/Login/NewUser";
import Settings from "./components/Settings/Settings";
import "./output.css";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/vendors" element={<Vendors />} />
        <Route path='/reports' element={<Reports />} />
        <Route path="/new-user" element={<NewUser />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
