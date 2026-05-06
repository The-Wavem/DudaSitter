import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}
