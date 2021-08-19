import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { register } from "../actions/userActions";

const RegisterScreen = ({ location, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);

  const { loading, error, userInfo } = userRegister;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmpassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(register(name, email, password));
    }
  };

  return (
    <FormContainer>
      <Form onSubmit={submitHandler}>
        <h1>Sign Up</h1>
        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
        <Form.Group controlId="name" className="mb-1">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Your Name"
            autoComplete="off"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="email" className="mb-1">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            autoComplete="off"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="password" className="mb-1">
          <Form.Label>Password </Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            autoComplete="off"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="confirmpassword" className="mb-1">
          <Form.Label>Confirm Password </Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            autoComplete="off"
            value={confirmpassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary" className="mb-1">
          Register
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          Have an Account?
          <Link
            to={redirect ? `/login?redirect=${redirect}` : "/login"}
            style={{ fontWeight: "bold" }}
          >
            Log In
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
