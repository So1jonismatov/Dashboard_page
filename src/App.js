import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/HomePage/Home";
import Dashboard from "./pages/DashboardPage/Dashboard";
import AddProduct from "./pages/AddProductPage/AddProduct";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add" element={<AddProduct />} />
        <Route exact path="/" element={<Home />} />
        <Route path="*" element={<Navigate to="/" />} /> {/* Redirect to home for unmatched routes */}
      </Routes>
    </Router>
  );
}

export default App;
