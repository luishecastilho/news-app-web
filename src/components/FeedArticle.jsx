import React from 'react';
import { Link } from "react-router-dom";

import "./FeedArticle.css";

const FeedArticle = ({article}) =>{
    return (
        <div className="article">
            <Link to={`/article/${article.id}`}><img src={article.banner} /></Link>
            <div className="body">
                <div className="header">
                    <small>{article.category}</small>
                    <Link to={`/article/${article.id}`}><h3>{article.title}</h3></Link>
                    <span>{article.description}</span>
                </div>
                <div className="footer">
                    <div className="extra-data">
                        <Link to={`/article/${article.id}`}><h4>{article.source}</h4></Link>
                        &nbsp;&nbsp;&nbsp;
                        <span>{article.author}</span>
                        &nbsp;&nbsp;&nbsp;
                        <span>{article.publishedAt}</span>
                    </div>
                    <Link to={`/article/${article.id}`}><button type="button">View</button></Link>
                </div>
            </div>
        </div>
    )
}
export default FeedArticle