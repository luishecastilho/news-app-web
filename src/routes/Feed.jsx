import { useEffect, useState } from 'react';
import axios from 'axios';
import './Feed.css';

import FeedArticle from "../components/FeedArticle";

function Feed() {

    const [articles, setArticles] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/feed')
        .then(function(response) {
            setArticles(response.data.data);
        });
    }, []);

  return (
    <div id="feed">
    {
        articles.map(function(article) {
            return (
                <FeedArticle article={article} />
            )
        })
    }
    </div>
  )
}

export default Feed
