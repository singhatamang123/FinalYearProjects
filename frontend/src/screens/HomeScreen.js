import React, { useEffect } from "react";
// import products from "../products";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import Loader from "../alertAndmessage/Loader";
import Messages from "../alertAndmessage/Messages";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";


function HomeScreen({ history }) {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { error, loading, products, page, pages } = productList;

  let keyword = history.location.search
  // console.log(keyword)
  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);

  return (
    <div>

      {!keyword &&
        <ProductCarousel />}
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Messages variant="danger">{error}</Messages>
      ) : (
        <div>
          <Row>
            {/* most commonly used for rendering a list of data to the DOM.*/}
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                {/* xs = extra small screens (mobile phones) sm = small screens (tablets) md = medium screens (some desktops) lg = large screens (remaining desktops)*/}
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate page={page} pages={pages} keyword={keyword} />
        </div>
      )}
    </div>
  );
}

export default HomeScreen;
