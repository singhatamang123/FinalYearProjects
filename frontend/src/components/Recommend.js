import React from "react";
import { Container } from "react-bootstrap";
import Recommendation from "../screens/Recommendation";
import { useSelector } from "react-redux";



function Recommend() {
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    return (
        <footer>
            <Container>
                {userInfo ? (

                    <Recommendation />
                ) : (
                    <div>
                        {/* <h1>You may also like</h1> */}
                    </div>
                )}
            </Container>
        </footer>
    );
}

export default Recommend;
