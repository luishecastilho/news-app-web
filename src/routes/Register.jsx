import { useEffect, useState } from 'react';
import axios from 'axios';
import './Register.css';

import SetCookie from '../hooks/SetCookie';
import GetCookie from '../hooks/GetCookie';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Register() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  document.title = "Sign up - News App";

  useEffect(() => {
    if(GetCookie('auth_token')){
        window.location.href = "/";
    }
  }, []);

  function submitForm(e) {
    e.preventDefault();
    axios.post("http://127.0.0.1:8000/api/auth/register", {
        "name": name,
        "email": email,
        "password": password
    }, {
        headers: {
                    'Accept': `application/json`
                }
    }).then((res) => {
        SetCookie("auth_token", res.data.data.token);
        window.location.href = "/user";
    })
    .catch(() => {
      alert("Error on trying to sign. Please try again.")
    })
  }

  return (
    <div id="register">
        <h1 className="header">
        Sign up form
      </h1>
      <div className="container">
        <Form onSubmit={submitForm}>
            <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control type="name" name="name" placeholder="Enter your name" value={name} onChange={e => setName(e.target.value)} />
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" name="email" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} />
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="password" placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
      </div>
    </div>
  )
}

export default Register
