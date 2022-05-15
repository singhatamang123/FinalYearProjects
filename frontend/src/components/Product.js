import React from "react";
import { Card } from "react-bootstrap";
import Rating from "./Rating";
import { Link } from "react-router-dom";


function Product({ product }) {
  return (
    <Card className="my-1 p-0 rounded " style={{
      border: 0, outline: 'none'
    }}>
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} width="100%" height="250px" />
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`} style={{ textDecoration: 'none', color: 'black' }}>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="div">
          <div className="my-3">
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
              color={"#ffa534"}
            />
          </div>
        </Card.Text>
        <Card.Text as="h3">${product.price}</Card.Text>
        {/* <Card.Text as="h3">${product.category}</Card.Text> */}

      </Card.Body>
    </Card >
  );
}

export default Product;
