import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import axios from "axios";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom";
import ConnectForm from "./comps/ConnectForm";
import { ChakraProvider } from "@chakra-ui/react";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/DashBoard";
import ProtectedRoute from "./util/ProtectedRoute";
import NewGroup from "./pages/NewGroup";
import MyGroups from "./pages/MyGroups";

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/newgroup"
            element={
              <ProtectedRoute>
                <NewGroup />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mygroups"
            element={
              <ProtectedRoute>
                <MyGroups />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
