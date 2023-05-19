import React from "react";
import { Button, Card } from "react-bootstrap";
import "./FeedArticle.css";


function NewsItem(props) {
  const { id, title, banner, description, content, source, url, category, author, publishedAt, alt } = props
  return (
    <>
      <Card className="card">
        <Card.Img className="img" variant="top" src={banner} alt={alt} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text className="txt">
            {description}
          </Card.Text>
          <details className="detail">
            <summary className="sum">Author, Source and Date</summary>
            <p className="text">
                {author ? "Unknown" : "Author: "+author}
            </p>
            <p className="text">
                Source: {source}
            </p>
            <p className="text">
                Published at: {publishedAt}
            </p>
          </details>
          <Button href={`/article/${id}`} target="_blank" className="btn">Read more →</Button>
        </Card.Body>
      </Card>
    </>
  );
}

export default NewsItem;