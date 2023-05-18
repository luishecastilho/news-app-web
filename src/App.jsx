import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

import FeedArticle from "./components/FeedArticle";

function App() {

    const [articles, setArticles] = useState([]);

    useEffect(() => {

        axios.get('http://127.0.0.1:8000/api/feed')
        .then(function(response) {
            setArticles(response.data.data);
        });
    }, []);

  return (
    <div className="App">
      <div id="header">
        <h1>News App</h1>
        <div id="auth">
            <button type="button">Login</button>
        </div>
      </div>
      <div id="feed">
        {
            articles.map(function(article) {
                return (
                    <FeedArticle article={article} />
                )
            })
        }
      </div>
    </div>
  )
}

export default App
