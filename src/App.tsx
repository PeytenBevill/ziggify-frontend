import React from "react";
import { Route, Routes } from "react-router";
import Header from "./components/Header/Header";
import Dashboard from "./components/Dashboard/Dashboard";
import { Inventory } from "./components/Inventory/Inventory";
import "./output.css";
import Vendors from "./components/Vendors/Vendors";
import Reports from "./components/Reports/Reports";

const App: React.FC = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/vendors" element={<Vendors />} />
        <Route path='/reports' element={<Reports />} />
      </Routes>
    </>
  );
};

export default App;
