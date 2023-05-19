import { useEffect, useState } from 'react';
import moment from "moment";
import { useParams } from "react-router-dom";
import nullImage from '../functions/nullImage'

import axios from 'axios';
import './Article.css';

function Article() {

    const { id } = useParams();

    const [article, setArticle] = useState([]);

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/feed/article/${id}`, {
            headers: {
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
                        ? nullImage(article.category)
                        : article.banner} alt="Banner" className="articleImage" />
            <div>
                <span className="articleSmallText">Category: <span className="articleSmallTextBold">{article.category}</span> - </span>
                <span className="articleSmallText">Author: <span className="articleSmallTextBold">{article.author != "" || article.author != null ? "Unknown" : article.author}</span></span>
            </div>
            <div>
                <span className="articleSmallTextBold">{article.source}</span>
                <span className="articleSmallText"> - {moment(article.publishedAt).format("MMM Do YY")}</span>
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
