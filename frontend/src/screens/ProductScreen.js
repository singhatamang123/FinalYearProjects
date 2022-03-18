import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Form, Button } from "react-bootstrap";
// import products from "../products";
import Rating from "../components/Rating";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails, createProductReview } from "../actions/productActions";
import Loader from "../alertAndmessage/Loader";
import Messages from "../alertAndmessage/Messages";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constant/productConstants";
import ContentRecommendation from "./ContentRecommendation";



function ProductScreen({ match, history }) {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const dispatch = useDispatch()

  const productDetails = useSelector(state => state.productDetails)
  const { loading, error, product } = productDetails

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const productReviewCreate = useSelector(state => state.productReviewCreate)
  const {
    loading: loadingProductReview,
    error: errorProductReview,
    success: successProductReview,
  } = productReviewCreate

  useEffect(() => {
    if (successProductReview) {
      setRating(0)
      setComment('')
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
    }

    dispatch(listProductDetails(match.params.id))

  }, [dispatch, match, successProductReview])


  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(createProductReview(
      match.params.id, {
      rating,
      comment
    }
    ))
  }

  return (

    <div>
      <Link to="/category">
        <h1>
          <IoArrowBackCircleSharp />
        </h1>
        {""}
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Messages variant="danger">{error}</Messages>
      ) : (
        <div>
          <Row>
            <Col md={4}>
              <Image
                src={product.image}
                alt={product.name}
                style={{
                  height: 500,
                  width: 500,
                }}
                fluid
              />
            </Col>
            <Col md={6}>
              <ListGroup variant="flush">
                <ListGroup.Item >
                  <h2>{product.name}</h2>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                    color={"#ffa534"}

                  />
                </ListGroup.Item>
                <ListGroup.Item>
                  <h4 style={{ color: "red" }}>Price: ${product.price}</h4>
                </ListGroup.Item>
                <ListGroup.Item >
                  <h4>Status: {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                  </h4>
                </ListGroup.Item>
                <ListGroup.Item>
                  <h4>Description:</h4> {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
          <br />
          <ContentRecommendation />
          <br />
          <Row>
            <Col md={6}>
              <h4 style={{ color: 'black' }}>Users Reviews</h4>
              {product.reviews.length === 0 && <Messages variant='info'>No reviews</Messages>}
              <ListGroup variant='flush'>
                {product.reviews.map((review) =>
                (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} color='#f8e825' />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h4> Write a review</h4>

                  {loadingProductReview && <Loader />}
                  {successProductReview && <Messages variant='success'>Review Submitted</Messages>}
                  {errorProductReview && <Messages variant='danger'>{errorProductReview}</Messages>}

                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId='rating'>
                        <Form.Label
                        >Rating</Form.Label>
                        <Form.Control
                          as='select'
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value=''>Select...</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>

                      <Form.Group controlId='comment'>
                        <Form.Label>Review</Form.Label>
                        <Form.Control
                          as='textarea'
                          row='5'
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>

                      <br />

                      <Button
                        disabled={loadingProductReview}
                        type='submit'
                        variant='primary'
                      >
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Messages variant='info'>Please <Link style={{ textDecoration: "none" }}
                      to='/login'>login</Link> to write a review</Messages>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </div>
      )}

    </div>
  )
}

export default ProductScreen