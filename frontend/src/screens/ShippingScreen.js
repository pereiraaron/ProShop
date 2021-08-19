import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import FormContainer from "../components/FormContainer";
import { saveShippingAddress } from "../actions/cartActions";
// import CheckoutSteps from "../components/CheckoutSteps";

const ShippingScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalcode, setPostalCode] = useState(shippingAddress.postalcode);
  const [country, setCountry] = useState(shippingAddress.country);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({
        address: address,
        city: city,
        postalcode: postalcode,
        country: country,
      })
    );
    history.push("/payment");
  };

  return (
    <FormContainer>
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="address" className="mb-3">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Your address"
            autoComplete="off"
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
            }}
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Your city"
            autoComplete="off"
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
            }}
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="postalcode">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter Your Postal Code"
            autoComplete="off"
            value={postalcode}
            onChange={(e) => {
              setPostalCode(e.target.value);
            }}
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="country">
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Your country"
            autoComplete="off"
            value={country}
            onChange={(e) => {
              setCountry(e.target.value);
            }}
            required
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary" className="mt-3">
          {" "}
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
