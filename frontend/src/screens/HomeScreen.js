import React, { useEffect } from "react";
// import products from "../products";
import { Row, Col} from "react-bootstrap";
import Product from "../components/Product";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import Loader from "../alertAndmessage/Loader";
import Messages from "../alertAndmessage/Messages";
import logo from "./logo.png";

function HomeScreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { error, loading, products } = productList;
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <div>
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Messages variant="danger">{error}</Messages>
      ) : (
        <Row>
          {/* most commonly used for rendering a list of data to the DOM.*/}
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              {" "}
              {/* xs = extra small screens (mobile phones) sm = small screens (tablets) md = medium screens (some desktops) lg = large screens (remaining desktops)*/}
              <Product product={product} />
            </Col>
          ))}
          <img src={logo} alt="logo" height="500" width="200" />
        </Row>
      )}
    </div>
  );
}

export default HomeScreen;
