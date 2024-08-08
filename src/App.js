import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/HomePage/Home";
import Dashboard from "./pages/DashboardPage/Dashboard";
import AddProduct from "./pages/AddProductPage/AddProduct";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add" element={<AddProduct />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
