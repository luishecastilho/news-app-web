import { useEffect, useState } from 'react';
import axios from 'axios';
import './Login.css';

import SetCookie from '../hooks/SetCookie';
import GetCookie from '../hooks/GetCookie';

import { Row, Col } from "react-bootstrap";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  document.title = "Login - News App";

  useEffect(() => {
    if(GetCookie('auth_token')){
        window.location.href = "/";
    }
  }, []);

  function submitForm(e) {
    e.preventDefault();
    axios.post("http://127.0.0.1:8000/api/auth/login", {
        "email": email,
        "password": password
    }, {
        headers: { 
                    'Accept': 'application/json'
                }
    }).then((res) => {
        SetCookie('auth_token', res.data.data.token);
        window.location.href = "/user";
    })
    .catch((error) => {
      console.error(error)
    })
  }

  return (
      <div id="login">
      <h1 className="header">
      Login
      </h1>
      <div className="container">
      <form action="" onSubmit={submitForm}>
            <input type="email" name="email" value={email} onChange={e => setEmail(e.target.value)} />
            <input type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} />
            <button type="submit">submit</button>
        </form>
      </div>
      </div>
  )
}

export default Login
