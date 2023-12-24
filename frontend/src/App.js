import React from "react";

import AuthenticationPage from "./Auth/Auth";
import InventoryPage from "./Inventory/Inventory";
import Detection from "./Detection/Detection";
import Root from "./Root/root";
import Navbar from "./navbar/navbar";
import Recom from "./recommandations/recom";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/auth" element={<AuthenticationPage />} />
        <Route exact path="/inventory" element={<InventoryPage />} />
        <Route path="/detection" element={<Detection />} />
        <Route path="/getrecommandation" element={<Recom />} />
      </Routes>
    </Router>
  );
};

export default App;
