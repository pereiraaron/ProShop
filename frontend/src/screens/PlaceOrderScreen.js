import React, { useEffect } from "react";
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Message from "../components/Message";
// import CheckoutSteps from "../components/CheckoutSteps";
import { Link } from "react-router-dom";
import { createOrder } from "../actions/orderActions";

const PlaceOrderScreen = ({ history }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  //Calculate Prices
  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => {
      return acc + item.price * item.qty;
    }, 0)
  );

  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 10);

  cart.taxPrice = addDecimals(Number((0.05 * cart.itemsPrice).toFixed(2)));

  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history, success]);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  return (
    <>
      {/* <CheckoutSteps step1 step2 step3 step4 /> */}
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address:</strong>
                {cart.shippingAddress.address},{cart.shippingAddress.postalcode}
                ,{cart.shippingAddress.city},{cart.shippingAddress.country}.
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Methods</h2>
              <p>
                <strong>Method:</strong>
                {cart.paymentMethod}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your Cart is Empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => {
                    return (
                      <ListGroup.Item key={index}>
                        <Row>
                          <Col md={1}>
                            <Image
                              src={item.image}
                              alt={item.name}
                              fluid
                              rounded
                            />
                          </Col>
                          <Col md={7}>
                            <Link to={`/product/${item.product}`}>
                              {item.name}
                            </Link>
                          </Col>
                          <Col md={4}>
                            {item.qty} x {item.price} = ${item.qty * item.price}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    );
                  })}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              {error && (
                <ListGroup.Item>
                  <Message variant="danger">{error}</Message>
                </ListGroup.Item>
              )}

              <ListGroup.Item>
                <Button
                  type="button"
                  disabled={cart.cartItems === 0}
                  onClick={placeOrderHandler}
                  style={{ width: "100%" }}
                >
                  PlaceOrder
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
