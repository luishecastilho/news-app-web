import { useEffect, useState } from 'react';
import axios from 'axios';
import GetCookie from '../hooks/GetCookie';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Select from 'react-select'

import './User.css';

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

    axios.get("http://127.0.0.1:8000/api/feed/filter-data", {
        headers: {
            'Accept': 'application/json'
        }
    })
    .then((res) => {
        var tmp_category = []
        res.data.data.categories.map((category) => {
            tmp_category.push({"value": category, "label": category});
        })
        setCategoryList(tmp_category);

        var tmp_source = []
        res.data.data.sources.map((source) => {
            tmp_source.push({"value": source, "label": source});
        })
        setSourceList(tmp_source);

        var tmp_author = []
        res.data.data.authors.map((author) => {
            tmp_author.push({"value": author, "label": author});
        })
        setAuthorList(tmp_author);
    })
    .catch((error) => {
        console.error(error)
    })
  }, []);

  function submitForm(e) {
    e.preventDefault();    
    axios.put("http://127.0.0.1:8000/api/user/preferences", {
        "sources": sources.map(function(val) {
            return val.value;
          }).join(','),
        "categories": categories.map(function(val) {
            return val.value;
          }).join(','),
        "authors": authors.map(function(val) {
            return val.value;
          }).join(',')
    }, {
        headers: {
                    'Authorization': `Bearer ${GetCookie('auth_token')}`,
                    'Accept': `application/json`
                }
    }).then(() => {
        alert("User preferences successfully updated.");
        window.location.href = "/";
    })
    .catch(() => {
        alert("Error on trying to update your preferences. Please try again.")
    })
  }

  return (
    <div id="user">
    <h1 className="header">
    Update Preferences
    </h1>
      <div className="container">
        <div className="formUser">
            <Form onSubmit={submitForm}>
                <Form.Group>
                    <Select defaultValue={[]} isMulti className="basic-multi-select" classNamePrefix="select" name="sources" options={sourceList} onChange={(item) => setSources(item)} placeholder="Select sources" />
                    <Select defaultValue={[]} isMulti className="basic-multi-select" classNamePrefix="select" name="categories" options={categoryList} onChange={(item) => setCategories(item)} placeholder="Select categories" />
                    <Select defaultValue={[]} isMulti className="basic-multi-select" classNamePrefix="select" name="authors" options={authorList} onChange={(item) => setAuthors(item)} placeholder="Select authors" />
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
