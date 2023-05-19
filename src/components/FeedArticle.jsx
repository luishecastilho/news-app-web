import React from "react";
import moment from "moment";
import { Button, Card } from "react-bootstrap";
import "./FeedArticle.css";


function NewsItem(props) {
  const { id, title, banner, description, source, author, publishedAt, alt } = props
  return (
      <div className="divCard">
        <Card.Img className="img" variant="top" src={banner} alt={alt} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text className="txt">
            {description}
          </Card.Text>
          <div className="bodyy">
          <details className="detail">
            <summary className="sum">Author, Source and Date</summary>
            <p className="text">
                {author != "" || author != null ? "Author: Unknown" : "Author: "+author}
            </p>
            <p className="text">
                Source: {source}
            </p>
            <p className="text">
                Published at: {moment(publishedAt).format("MMM Do YY")}
            </p>
          </details>
          <Button href={`/article/${id}`} className="btn">Read more →</Button>
          </div>
        </Card.Body>
      </div>
  );
}

export default NewsItem;