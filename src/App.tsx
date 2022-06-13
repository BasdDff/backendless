import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Backendless from 'backendless'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Profile from "./pages/Profile";
import Home from "./pages/Home";

function App() {

    useEffect(() => {
        Backendless.UserService.getCurrentUser().then(response => {
            console.log(response)
        })
    }, [])

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/profile" element={<Profile/>}/>
            </Routes>
        </BrowserRouter>

    );
}

export default App;
