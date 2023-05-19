import { useEffect, useState } from 'react';
import axios from 'axios';
import './User.css';

function User() {

  const [user, setUser] = useState([]);

  useEffect(() => {
      axios.get("http://127.0.0.1:8000/api/user")
      .then(function(response) {
        setUser(response.data);
      });
  }, []);

  return (
    <div id="user">
    User
    {user}
    </div>
  )
}

export default User
