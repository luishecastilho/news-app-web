import { useEffect, useState } from 'react';
import axios from 'axios';
import './Register.css';

function Register() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function submitForm(e) {
    e.preventDefault();
    axios.post("http://127.0.0.1:8000/api/auth/register", {
        "name": name,
        "email": email,
        "password": password
    }).then(function(response) {
        console.log(response.data);
    });
  }

  return (
    <div id="register">
        Register
        <form action="" onSubmit={submitForm}>
            <input type="text" name="name" value={name} onChange={e => setName(e.target.value)} />
            <input type="email" name="email" value={email} onChange={e => setEmail(e.target.value)} />
            <input type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} />
            <button type="submit">submit</button>
        </form>
    </div>
  )
}

export default Register
