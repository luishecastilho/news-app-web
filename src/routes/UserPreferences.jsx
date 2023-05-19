import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import './User.css';

import GetCookie from '../hooks/GetCookie';

import { Card } from "react-bootstrap"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function UserPreferences() {

  const [sources, setSources] = useState([]);
  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);

  const [categoryList, setCategoryList] = useState([]);
  const [sourceList, setSourceList] = useState([]);
  const [authorList, setAuthorList] = useState([]);

  document.title = "My Preferences - News App";

  useEffect(() => {
    if(!GetCookie('auth_token')){
        window.location.href = "/login";
    }
    axios.get("http://127.0.0.1:8000/api/user/preferences", {
        headers: { 
                    'Authorization': `Bearer ${GetCookie('auth_token')}`,
                    'Accept': 'application/json'
                }
    })
    .then((res) => {
        setSources(res.data.data.sources);
        setCategories(res.data.data.categories);
        setAuthors(res.data.data.authors);
    })
    .catch((error) => {
      console.error(error)
    })

    axios.get("http://127.0.0.1:8000/api/feed/filter-data", {
        headers: {
            'Accept': 'application/json'
        }
    })
    .then((res) => {
        setCategoryList(res.data.data.categories);
        setSourceList(res.data.data.sources);
        setAuthorList(res.data.data.authors);
    })
    .catch((error) => {
        console.error(error)
    })
  }, []);

  function submitForm(e) {
    e.preventDefault();
    console.log(
        {"sources": sources,
        "categories": categories,
        "authors": authors}
    );
    /*
    axios.put("http://127.0.0.1:8000/api/user/preferences", {
        "sources": sources,
        "categories": categories,
        "authors": authors
        // EXPLODE ISSO
    }, {
        headers: {
                    'Authorization': `Bearer ${GetCookie('auth_token')}`,
                    'Accept': `application/json`
                }
    }).then(() => {
        alert("User preferences successfully updated.");
        window.location.href = "/user/preferences";
    })
    .catch(() => {
        alert("Error on trying to update your preferences. Please try again.")
    })*/
  }

  return (
    <div id="user">
    <h1 className="header">
    My Preferences
    </h1>
      <div className="container">
        <div className="formUser">
            <Form onSubmit={submitForm}>
                <Form.Group>

                <select multiple="multiple" name="sources" className="form-control" defaultValue={[]} isMulti onChange={e => setSources(e.target.value)}>
                    {
                        /*sourceList.map((source) => {
                            return (
                                <option value={source} key={source}>{source}</option>
                            )
                        })*/
                    }
                </select>
                <select multiple name="categories" className="form-control" defaultValue={[]} isMulti onChange={e => setCategories(e.target.value)}>
                    {
                        /*categoryList.map((source) => {
                            return (
                                <option value={source} key={source}>{source}</option>
                            )
                        })*/
                    }
                </select>
                <select multiple name="authors" className="form-control" defaultValue={[]} isMulti onChange={e => setAuthors(e.target.value)}>
                    {
                        /*authorList.map((source) => {
                            return (
                                <option value={source} key={source}>{source}</option>
                            )
                        })*/
                    }
                </select>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Save
                </Button>
            </Form>
        </div>
      </div>
    </div>
  )
}

export default UserPreferences
