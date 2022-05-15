import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Form, Button, Card } from "react-bootstrap";
// import products from "../products";
import Rating from "../components/Rating";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails, createProductReview } from "../actions/productActions";
import Loader from "../alertAndmessage/Loader";
import Messages from "../alertAndmessage/Messages";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constant/productConstants";
import Recommend from '../components/Recommend';
import Product from '../components/Product';




function ProductScreen({ match, history }) {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const dispatch = useDispatch()

  const productDetails = useSelector(state => state.productDetails)
  const { loading, error, product, similar } = productDetails

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
            <Col md={4} style={{ backgroundColor: "white", marginLeft: "10px" }}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'} />
                </ListGroup.Item>

                <ListGroup.Item>
                  Description: {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>


            <Col md={3}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <h4 style={{ color: "red" }}>${product.price}</h4>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item >
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        <h4>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</h4>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col xs='auto' className='my-1'>
                          <Form.Control
                            as="select"
                          // value={qty}
                          // onChange={(e) => setQty(e.target.value)}
                          >
                            {

                              [...Array(product.countInStock).keys()].map((x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              ))
                            }

                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Button
                      // onClick={addToCartHandler}
                      className='btn-block'
                      // disabled={product.countInStock == 0}
                      type='button'
                      style={{ backgroundColor: "#ffa534", color: "white" }}
                    >

                      Add to Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>

          </Row>
          <br />
          <h2> You may also like this</h2>
          <Row>
            {
              similar.map((sP) => (
                <Col key={sP._id} xs={12} sm={6} md={4} lg={3}>
                  <Product product={sP} />
                </Col>
              )
              )

            }
          </Row>

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
          < Recommend />

        </div >

      )
      }

    </div >
  )
}

export default ProductScreen