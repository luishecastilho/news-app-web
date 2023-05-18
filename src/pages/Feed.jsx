import { useEffect, useState } from 'react';
import axios from 'axios';
import './Feed.css';

import FeedArticle from "../components/FeedArticle";
import Header from "../components/Header";

function Feed() {

    const [articles, setArticles] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/feed')
        .then(function(response) {
            setArticles(response.data.data);
        });
    }, []);

  return (
    <>
      <Header />
      {/* nav bar de search e filtros */}
      <div id="feed">
        {
            articles.map(function(article) {
                return (
                    <FeedArticle article={article} />
                )
            })
        }
      </div>
    </>
  )
}

export default Feed
