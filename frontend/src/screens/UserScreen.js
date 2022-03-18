import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../alertAndmessage/Loader";
import Messages from "../alertAndmessage/Messages";
import { getUserDetails, updateUserProfile } from "../actions/userAction";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import FormContain from "../components/FormContain";
import { Link } from "react-router-dom";
import { USER_UPDATE_PROFILE_RESET } from "../constant/usersConstant";

function UserScreen({ history }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { error, loading, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;


  const userUpdateProfile = useSelector(state => state.userUpdateProfile)
  const { success } = userUpdateProfile

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user || !user.name || success || userInfo._id !== user._id) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET })
        dispatch(getUserDetails("profile"));

      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [history, dispatch, userInfo, user, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(updateUserProfile({
        'id': user._id,
        'name': name,
        'email': email,
        'password': password,
      }))
    }
  };
  return (
    <div>
      <Link to=''>
        <h1>
          <IoArrowBackCircleSharp />
        </h1>
      </Link>
      <FormContain>
        <h2>User Info</h2>
        {message && <Messages variant="danger">{message}</Messages>}
        {error && <Messages variant="danger">{error}</Messages>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="passwordConfirm">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type='submit' variant='primary'>
            Update
          </Button>
        </Form>
      </FormContain>

    </div>
  );
}

export default UserScreen;
