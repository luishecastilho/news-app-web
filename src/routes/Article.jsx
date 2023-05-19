import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import './Article.css';

import GetCookie from '../hooks/GetCookie';

function Article() {

    const { id } = useParams();

    const [article, setArticle] = useState([]);

    useEffect(() => {
        if(!GetCookie('auth_token')){
            window.location.href = "/login";
        }

        axios.get(`http://127.0.0.1:8000/api/feed/article/${id}`, {
            headers: { 
                        'Authorization': `Bearer ${GetCookie('auth_token')}`,
                        'Accept': 'application/json'
                    }
        })
        .then((res) => {
            setArticle(res.data.data);
        })
        .catch((error) => {
          console.error(error)
        })
    }, []);

  return (
    <div id="article">
        <h1 className="header">
        article
        </h1>
        <div className="container">
        <p style={{color: '#ffffff'}}>{article.title}</p>
        </div>
    </div>
  )
}

export default Article
