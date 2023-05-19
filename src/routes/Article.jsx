import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import './Article.css';

function Article() {

    const { id } = useParams();

    const [article, setArticle] = useState([]);

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/feed/article/"+id)
        .then(function(response) {
            setArticle(response.data);
        });
    }, []);

  return (
    <div id="article">
        article
        {article}
    </div>
  )
}

export default Article
