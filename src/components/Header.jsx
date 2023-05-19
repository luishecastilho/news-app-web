import React, { useEffect, useState } from 'react';

import GetCookie from '../hooks/GetCookie';

import { Link } from "react-router-dom";

    function renderAuthButton() {
        if(!GetCookie('auth_token')) {
            return (
                <>
                <Link to="/login"><button type="button">Login</button></Link>
                <Link to="/register"><button type="button">Sign up</button></Link>
                </>
            )
        }else{
            return (
                <Link to="/user"><button type="button">My Account</button></Link>
            )
        }
    }

const Header = () =>{
    return (
        <div id="header">
            <Link to="/"><h1>News App</h1></Link>
            <div id="auth">
                {renderAuthButton()}
            </div>
        </div>
    )
}
export default Header