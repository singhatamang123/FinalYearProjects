import React, { useEffect } from "react";
// import products from "../products";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import { recommendContentProduct } from "../actions/productActions"
import { useDispatch, useSelector } from "react-redux";



function ContentRecommendation() {
    const dispatch = useDispatch()
    const productContentRecommend = useSelector((state) => state.productContentRecommend)
    const { products } = productContentRecommend;
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;


    // let keyword = history.location.search
    // console.log(keyword)
    useEffect(() => {
        dispatch(recommendContentProduct());
    }, [dispatch]);


    return (
        <div>

            {userInfo ? (

                <div>

                    <div>
                        <h1>You may also like</h1>
                    </div>
                    <div>
                        <Row>
                            {products.map((product) => (
                                <Col key={product._id} xs={12} sm={6} md={4} lg={3}>
                                    <Product product={product} />
                                </Col>

                            ))}
                        </Row>
                    </div>
                </div>
            ) : (
                <div>
                    {/* <h1>You may also like</h1> */}
                </div>
            )}
        </div>
    );
}



//                 <h1>Best Product</h1>

//                 {loading ? (
//                     <Loader />
//                 ) : error ? (
//                     <Messages variant="danger">{error}</Messages>
//                 ) : (

//                     <div>
//                         <Row>
//                             {
//                                 products.map((product) => (
//                                     <Col key={product._id} xs={12} sm={6} md={4} lg={3}>
//                                         <Product product={product} />
//                                     </Col>
//                                 )
//                                 )

//                             }
//                         </Row>

//                     </div>

//                 )}

//             </div>

//         </div>
//     );
// }

export default ContentRecommendation;


