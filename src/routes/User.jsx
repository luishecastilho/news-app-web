import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import './User.css';

import GetCookie from '../hooks/GetCookie';
import RemoveCookie from '../hooks/RemoveCookie';

function logout() {
    axios.post("http://127.0.0.1:8000/api/auth/logout", {}, {
        headers: { 
                    'Authorization': `Bearer ${GetCookie('auth_token')}`,
                    'Accept': 'application/json'
                }
    })
    .then(() => {
        RemoveCookie('auth_token');
        window.location.href = "/login";
    })
    .catch((error) => {
      console.error(error)
    })
  }

function User() {

  const [user, setUser] = useState([]);

  useEffect(() => {
    if(!GetCookie('auth_token')){
        window.location.href = "/login";
    }
    axios.get("http://127.0.0.1:8000/api/user", {
        headers: { 
                    'Authorization': `Bearer ${GetCookie('auth_token')}`,
                    'Accept': 'application/json'
                }
    })
    .then((res) => {
        setUser(res.data.data.user);
    })
    .catch((error) => {
      console.error(error)
    })
  }, []);

  return (
    <div id="user">
    User
    <p>{user.name}</p>
    <Link to="/user/edit"><button type='button'>Edit</button></Link>
    <button type='button' onClick={logout}>Sign Out</button>
    </div>
  )
}

export default User
