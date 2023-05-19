import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GetCookie from '../hooks/GetCookie';
import FeedFake from "../components/FeedFake";
import FeedArticle from "../components/FeedArticle";
import "./Feed.css";

import Spinner from "../components/Spinner/Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import Nullimage from "../components/Images/nullimage.png";
import { Row, Col } from "react-bootstrap";
import LoadingBar from "react-top-loading-bar";

function Feed() {
    const [articles, setArticles] = useState([]);
    const [pagination, setPagination] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [totalResults, setTotalResults] = useState(0);

    const [progress, setProgress] = useState(0);
    const pageSize = 7;

    const capitaLize = (string) => {
      return string.charAt(0).toUpperCase() + string.slice(1);
    };

    document.title = "Feed - News App";

    useEffect(() => {
        if(GetCookie('auth_token')){
            setProgress(15);
            axios.get('http://127.0.0.1:8000/api/feed', {
                headers: { 
                            'Authorization': `Bearer ${GetCookie('auth_token')}`,
                            'Accept': 'application/json'
                        }
            })
            .then((res) => {
                setLoading(true);
                setProgress(70);
                setPagination(res.data.data.articles);
                setArticles(res.data.data.articles.data);
                setTotalResults(res.data.data.articles.data.length);
                setLoading(false);
                setProgress(100);
            })
            .catch((error) => {
                console.error(error)
            })
        }
    }, []);

  return (
    <div id="feed">
        <LoadingBar color="#005abb" height={3} progress={progress} />
        <h1 className="header">
        News Feed
        </h1>
        {loading && <Spinner />}
        <div className="container">
          <Row>
            {articles.map((element) => {
              return (
                <Col
                  sm={12}
                  md={6}
                  lg={4}
                  xl={3}
                  className="card"
                  key={element.url}
                >
                  <FeedArticle
                    id={element.id}
                    title={element.title}
                    banner={
                      element.banner === null || 
                      element.banner === ""
                        ? Nullimage
                        : element.banner
                    }
                    description={element.description}
                    content={element.content}
                    source={element.source}
                    author={element.author}
                    publishedAt={element.publishedAt}
                    alt="Article"
                  />
                </Col>
              );
            })}
          </Row>
        </div>
    </div>
  )
}

export default Feed
