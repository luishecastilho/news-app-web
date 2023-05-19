import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Feed.css';

import GetCookie from '../hooks/GetCookie';

import FeedArticle from "../components/FeedArticle";
import FeedFake from "../components/FeedFake";

function renderContent() {
    if(GetCookie('auth_token')){
        articles.map(function(article) {
            return (
                <FeedArticle article={article} key={article.id} />
            )
        })
    }else{
        <FeedFake />
    }
}

function Feed() {

    const [articles, setArticles] = useState([]);
    const [pagination, setPagination] = useState([]);

    useEffect(() => {
        if(GetCookie('auth_token')){
            axios.get('http://127.0.0.1:8000/api/feed', {
                headers: { 
                            'Authorization': `Bearer ${GetCookie('auth_token')}`,
                            'Accept': 'application/json'
                        }
            })
            .then((res) => {
                setPagination(res.data.data.articles);
                setArticles(res.data.data.articles.data);
            })
            .catch((error) => {
            console.error(error)
            })
        }
    }, []);

  return (
    <div id="feed">
    {
        articles.map(function(article) {
            return (
                <FeedArticle article={article} key={article.id} />
            )
        })
    }
    </div>
  )
}

export default Feed
