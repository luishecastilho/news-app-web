import React from 'react';

import "./FeedArticle.css";

const FeedArticle = ({article}) =>{
    return (
        <div className="article">
            <img src={article.banner} />
            <div className="body">
                <div className="header">
                    <small>{article.category}</small>
                    <h3>{article.title}</h3>
                    <span>{article.description}</span>
                </div>
                <div className="footer">
                    <div className="extra-data">
                        <a href={article.url} target="_blank"><h4>{article.source}</h4></a>
                        &nbsp;&nbsp;&nbsp;
                        <span>{article.author}</span>
                        &nbsp;&nbsp;&nbsp;
                        <span>{article.publishedAt}</span>
                    </div>
                    <button type="button">View</button>
                </div>
            </div>
        </div>
    )
}
export default FeedArticle