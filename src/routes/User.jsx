import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import {api} from '../api';
import './User.css';

import GetCookie from '../hooks/GetCookie';

import { Card } from "react-bootstrap"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function User() {

  const [user, setUser] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  document.title = "My Account - News App";

  useEffect(() => {
    if(!GetCookie('auth_token')){
        window.location.href = "/login";
    }
    api.get("/user", {
        headers: { 
                    'Authorization': `Bearer ${GetCookie('auth_token')}`,
                    'Accept': 'application/json'
                }
    })
    .then((res) => {
        setUser(res.data.data.user);
        setName(res.data.data.user.name);
        setEmail(res.data.data.user.email);
    })
    .catch((error) => {
      console.error(error)
    })
  }, []);

  function submitForm(e) {
    e.preventDefault();
    api.put("/user", {
        "name": name,
        "email": email,
        "password": password ?? ""
    }, {
        headers: {
                    'Authorization': `Bearer ${GetCookie('auth_token')}`,
                    'Accept': `application/json`
                }
    }).then(() => {
        alert("User successfully updated.");
        window.location.href = "/user";
    })
    .catch(() => {
        alert("Error on trying to update your account. Please try again.")
    })
  }

  return (
    <div id="user">
    <h1 className="header">
    My Account
    </h1>
      <div className="container">
            <a href="/user/preferences"><Button variant="primary">
                My preferences
            </Button></a>
        <div className="formUser">
            <h3 style={{color: '#fff'}}>Personal data</h3>
            <hr style={{color: '#fff'}} />
            <Form onSubmit={submitForm}>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="name" name="name" placeholder="Enter your name" value={name} onChange={e => setName(e.target.value)} />
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name="email" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} />
                    <Form.Label>New password</Form.Label>
                    <Form.Control type="password" name="password" placeholder="New password" value={password} onChange={e => setPassword(e.target.value)} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Save
                </Button>
            </Form>
        </div>
      </div>
    </div>
  )
}

export default User
