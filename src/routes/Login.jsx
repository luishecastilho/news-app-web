import { useEffect, useState } from 'react';
import {api} from '../api';
import './Login.css';

import SetCookie from '../hooks/SetCookie';
import GetCookie from '../hooks/GetCookie';

import { Row, Col, FormGroup } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

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
    api.post("/auth/login", {
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
    .catch(() => {
      alert("The Email or Password field are invalid. Please try again.");
    })
  }

  return (
      <div id="login">
      <h1 className="header">
      Login
      </h1>
      <div className="container">
        <Form onSubmit={submitForm}>
            <Form.Group>
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" name="email" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} />
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="password" placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} />

            </Form.Group>
            <Button variant="primary" type="submit">
                Login
            </Button>
            <p className="txt">Don't have an account? <a href="/register">Sign up here.</a></p>
        </Form>
      </div>
      </div>
  )
}

export default Login
