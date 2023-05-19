import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GetCookie from '../hooks/GetCookie';
import FeedFake from "../components/FeedFake";
import FeedArticle from "../components/FeedArticle";
import "./Feed.css";

import Spinner from "../components/Spinner/Spinner";
import "../components/FilterBar.css";
import PropTypes from "prop-types";
import Nullimage from "../components/Images/nullimage.png";
import { Row, Col } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import LoadingBar from "react-top-loading-bar";

function Feed() {
    const [articles, setArticles] = useState([]);
    const [pagination, setPagination] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    const [filter, setFilter] = useState(false);


    const [q, setQ] = useState("");
    const [category, setCategory] = useState("");
    const [source, setSource] = useState("");
    const [categoryList, setCategoryList] = useState([]);
    const [sourceList, setSourceList] = useState([]);
    const [publishedAt, setPublishedAt]= useState("");

    document.title = "Feed - News App";

    useEffect(() => {
        var urlArticles= "";
        var urlFilterData= "";
        var headers = {};
        if(GetCookie('auth_token')) {
            urlArticles = "http://127.0.0.1:8000/api/auth/feed"
            urlFilterData = "http://127.0.0.1:8000/api/auth/feed/filter-data"
            headers = { 
                'Authorization': `Bearer ${GetCookie('auth_token')}`,
                'Accept': 'application/json'
            }
        }else{
            urlArticles = "http://127.0.0.1:8000/api/feed"
            urlFilterData = "http://127.0.0.1:8000/api/feed/filter-data"
            headers = {
                'Accept': 'application/json'
            }
        }

        // get Feed
        setProgress(15);
        axios.get(urlArticles, {
            headers: headers
        })
        .then((res) => {
            setLoading(true);
            setProgress(70);
            setPagination(res.data.data.articles);
            setArticles(res.data.data.articles.data);
            setLoading(false);
            setProgress(100);
        })
        .catch((error) => {
            console.error(error)
        })

        // get Filters data
        axios.get(urlFilterData, {
                headers: headers
            })
            .then((res) => {
                setCategoryList(res.data.data.categories);
                setSourceList(res.data.data.sources);
            })
            .catch((error) => {
                console.error(error)
            })
    }, []);

    function handleFilter(e){
        e.preventDefault();
        setFilter(!filter);
    }

    function handleSearch(e){
        e.preventDefault();
        setProgress(15);
        axios.get(`http://127.0.0.1:8000/api/feed?q=${q}&category=${category}&source=${source}&publishedAt=${publishedAt}`, {
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
            setLoading(false);
            setProgress(100);
        })
        .catch((error) => {
            console.error(error)
        })
    }

  return (
    <div id="feed">
        <LoadingBar color="#005abb" height={3} progress={progress} />
        <h1 className="header">
        News Feed
        </h1>
        {loading && <Spinner />}
        <div className="filterDiv">
            <Button variant="primary" onClick={handleFilter}>
                Filter
            </Button>
        </div>
        {filter === true &&
            <>
                <div className="fieldBar">
                    <input type="text" name="q" placeholder="Search by keyword..." className="form-control" onChange={e => setQ(e.target.value)} />
                    <div className="selects">
                        <select name="source" className="form-control" defaultValue="" onChange={e => setSource(e.target.value)}>
                            <option value="" disabled>Choose a source</option>
                            {
                                sourceList.map((source) => {
                                    return (
                                        <option value={source} key={source}>{source}</option>
                                    )
                                })
                            }
                        </select>
                        <select name="categories" className="form-control" defaultValue="" onChange={e => setCategory(e.target.value)}>
                            <option value="" disabled>Choose a category</option>
                            {
                                categoryList.map((category) => {
                                    return (
                                        <option value={category} key={category}>{category}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <input type="date" name="publishedAt" placeholder="Search by date..." className="form-control" onChange={e => setPublishedAt(e.target.value)} />
                    <Button variant="primary" onClick={handleSearch}>
                        Submit
                    </Button>
                </div>
                <hr style={{color: '#fff'}} />
            </>
        }
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
