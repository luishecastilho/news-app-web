import { useEffect, useState } from 'react';
import axios from 'axios';
import './Article.css';

import Header from "../components/Header";

function Article() {

    const [article, setArticle] = useState([]);

    useEffect(() => {
    }, []);

  return (
    <>
      <div id="article">
        article
      </div>
    </>
  )
}

export default Article
