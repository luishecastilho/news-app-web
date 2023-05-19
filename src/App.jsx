import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css'

function App() {
    document.body.style.backgroundColor = "rgb(36, 39, 41)";
    return (
        <div className="App">
            <NavBar />
            <Outlet />
        </div>
    )
}

export default App