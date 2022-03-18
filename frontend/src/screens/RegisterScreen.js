import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Link } from "react-router-dom";
// import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../alertAndmessage/Loader";
import Messages from "../alertAndmessage/Messages";
import FormContainer from "../components/FormContainer";
import { registers } from "../actions/userAction";


// for validation purposes
const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Fullname is required")
    // username: Yup.string()
    .required("Username is required")
    .min(6, "Username must be at least 6 characters")
    .max(20, "Username must not exceed 20 characters")
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
  email: Yup.string().required("Email is required").email("Email is invalid"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(40, "Password must not exceed 40 characters"),
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password"), null], "Confirm Password does not match"),
  acceptTerms: Yup.bool().oneOf([true], "Accept Terms is required"),
});

function RegisterScreen({ location, history }) {



  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const userRegister = useSelector((state) => state.userRegister);
  const { error, loading, userInfo } = userRegister;





  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const submitHandler = (e) => {
    dispatch(registers(name, email, password));


  };

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {error && <Messages variant="danger">{error}</Messages>}
      {loading && <Loader />}
      <div className="register-form">
        <form onSubmit={handleSubmit(submitHandler)}>
          <div className="form-group">
            {/* <label>Name</label> */}
            <input
              name="name"
              type="text"
              {...register("name")}
              className={`form-control ${errors.name ? "is-invalid" : ""}`}
              value={name}
              placeholder="Enter your name"
              onChange={(e) => setName(e.target.value)}
            />
            <div className="invalid-feedback">{errors.name?.message}</div>
          </div>
          <br></br>

          <div className="form-group">
            {/* <label>Email</label> */}
            <input
              name="email"
              type="text"
              {...register("email")}
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="invalid-feedback">{errors.email?.message}</div>
          </div>
          <br></br>


          <div className="form-group">
            {/* <label>Password</label> */}
            <input
              name="password"
              type="password"
              {...register("password")}
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="invalid-feedback">{errors.password?.message}</div>
          </div>
          <br></br>


          <div className="form-group">
            {/* <label>Confirm Password</label> */}
            <input
              name="confirmPassword"
              type="password"
              {...register("confirmPassword")}
              className={`form-control ${errors.confirmPassword ? "is-invalid" : ""
                }`}
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <div className="invalid-feedback">
              {errors.confirmPassword?.message}
            </div>
          </div>

          <div className="d-grid mt-2">
            <button variant="primary" size="lg" className="btn btn-primary">
              Register
            </button>
          </div>

          <div className="form-group">
            Have an Account?{" "}
            <Link
              to={redirect ? `/login?redirect=${redirect}` : "/login"}
              style={{ textDecoration: "none" }}
            >
              Sign In
            </Link>
          </div>
        </form>
      </div>
    </FormContainer>
  );
}

export default RegisterScreen;
