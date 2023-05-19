import React from "react"
import { Navbar, Nav } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"
import {api} from '../api';

import GetCookie from '../hooks/GetCookie';
import RemoveCookie from '../hooks/RemoveCookie';

function logout(e) {
    e.preventDefault();
    api.post("/auth/logout", {}, {
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

function renderAuthButton() {
    if(!GetCookie('auth_token')) {
        return (
            <>
            <LinkContainer to="/login">
              <Nav.Link className="ml-2">Login</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/register">
              <Nav.Link className="ml-2">Sign Up</Nav.Link>
            </LinkContainer>
            </>
        )
    }else{
        return (
            <>
            <LinkContainer to="/user">
              <Nav.Link className="ml-2">My Account</Nav.Link>
            </LinkContainer>
            <a href="#" className="ml-2 active nav-link" data-rr-ui-event-key="#" onClick={logout}>Logout</a>
            </>
        )
    }
}

const navs = [
    { nav: "Home", page: "/" },
    { nav: "General", page: "/general" },
    { nav: "Business", page: "/business" },
    { nav: "Sports", page: "/sports" },
    { nav: "Science", page: "/science" },
    { nav: "Health", page: "/health" },
    { nav: "Entertainment", page: "/entertainment" },
    { nav: "Technology", page: "/technology" }
];

function NavBar() {
  return (
    <Navbar style={{backgroundColor: 'rgb(41,47,51)', padding: '20px', fontSize: '18px'}} variant="dark" expand="lg" fixed="top">
      <Navbar.Brand style={{fontSize: '27px', marginLeft: '20px'}} href="/">News App</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto" style={{marginLeft: '14px'}}>
            {renderAuthButton()}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}
export default NavBar;