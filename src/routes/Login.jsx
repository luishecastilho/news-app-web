import { useEffect, useState } from 'react';
import axios from 'axios';
import './Login.css';

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function submitForm(e) {
    e.preventDefault();
    axios.post("http://127.0.0.1:8000/api/auth/login", {
        "email": email,
        "password": password
    }).then(function(response) {
        console.log(response.data);
    });
  }

  return (
      <div id="login">
        Login
        <form action="" onSubmit={submitForm}>
            <input type="email" name="email" value={email} onChange={e => setEmail(e.target.value)} />
            <input type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} />
            <button type="submit">submit</button>
        </form>
      </div>
  )
}

export default Login
