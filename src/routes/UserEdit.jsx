import { useEffect, useState } from 'react';
import axios from 'axios';
import './UserEdit.css';

import GetCookie from '../hooks/GetCookie';

function UserEdit() {

  const [user, setUser] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
        setName(res.data.data.user.name);
        setEmail(res.data.data.user.email);
    })
    .catch((error) => {
      console.error(error)
    })
  }, []);

  function submitForm(e) {
    e.preventDefault();
    axios.put("http://127.0.0.1:8000/api/user", {
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
    .catch((error) => {
      console.error(error)
    })
  }

  return (
    <div id="user">
    UserEdit
    <p>{user.name}</p>
    <form action="" onSubmit={submitForm}>
        <input type="text" name="name" value={name} onChange={e => setName(e.target.value)} />
        <input type="email" name="email" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} />
        <button type="submit">submit</button>
    </form>
    </div>
  )
}

export default UserEdit