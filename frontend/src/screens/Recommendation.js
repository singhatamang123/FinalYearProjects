import React, { useEffect } from "react";
// import products from "../products";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import { recommendProduct } from "../actions/productActions"
import { useDispatch, useSelector } from "react-redux";
import Loader from "../alertAndmessage/Loader";
import Messages from "../alertAndmessage/Messages";



function Recommendation() {
    const dispatch = useDispatch()
    const productRecommend = useSelector((state) => state.productRecommend)
    const { error, loading, products } = productRecommend;


    // let keyword = history.location.search
    // console.log(keyword)
    useEffect(() => {
        dispatch(recommendProduct());
    }, [dispatch]);


    return (
        <div>
            <h2>Recommendation for you</h2>

            {/* {!keyword
            } */}
            {loading ? (
                <Loader />
            ) : error ? (
                <Messages variant="danger">{error}</Messages>
            ) : (

                <div>
                    <Row>
                        {
                            products.map((product) => (
                                <Col key={product._id} xs={12} sm={6} md={4} lg={3}>
                                    <Product product={product} />
                                </Col>
                            )
                            )

                        }
                    </Row>

                </div>

            )}

        </div>
    );
}

export default Recommendation;


