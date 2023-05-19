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
        Article - #{ article.id }
        </h1>
        <div className="container">
            <img src={article.banner === null || article.banner === ""
                        ? Nullimage
                        : article.banner} alt="Banner" className="articleImage" />
            <div>
                <span className="articleSmallText">Category: <span className="articleSmallTextBold">{article.category}</span> - </span>
                <span className="articleSmallText">Author: <span className="articleSmallTextBold">{article.author != "" || article.author != null ? "Unknown" : article.author}</span></span>
            </div>
            <div>
                <span className="articleSmallTextBold">{article.source}</span>
                <span className="articleSmallText"> - {article.publishedAt}</span>
            </div>
            <h2 className="articleTitle">{article.title}</h2>
            <div className="bodyContent">
                <p className="txt">{article.description}</p>
                <p className="articleContent">{article.content}</p>
            </div>
            <a href={article.url} target="_blank">Read the original article.</a>
        </div>
    </div>
  )
}

export default Article
