import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../alertAndmessage/Loader";
import Messages from "../alertAndmessage/Messages";
import { login } from "../actions/userAction";
import FormContainer from "../components/FormContainer";


function LoginScreen({ location, history }) {


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const redirect = location.search ? location.search.split("=")[1] : "/";

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, redirect, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <FormContainer>
      {error && <Messages variant="danger">{error}</Messages>}
      {loading && <Loader />}
      <h1>Login</h1>
      <div className="register-form">
        <form onSubmit={submitHandler}>
          <div className="form-group">
            <input
              name="email"
              type="text"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <br></br>
          <div className="form-group">
            <input
              name="password"
              type="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="d-grid mt-2">
            <button variant="primary" size="lg" className="btn btn-primary">
              Login
            </button>
          </div>
        </form>
      </div>
      New Customer?{" "}
      <Link
        to={redirect ? `/register?redirect=${redirect}` : "/register"}
        style={{ textDecoration: "none" }}
      >
        Register
      </Link>
    </FormContainer>
  );
}

export default LoginScreen;
