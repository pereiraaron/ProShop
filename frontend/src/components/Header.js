import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { logout } from "../actions/userActions";
import SearchBox from "./SearchBox";

const Header = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <img
                alt=""
                src="../../images/logo.png"
                width="28"
                height="28"
                className="d-inline-block align-top"
                style={{ paddingRight: "5px" }}
              />
              ProShop
            </Navbar.Brand>
          </LinkContainer>
          {window.innerWidth > 768 && (
            <Route
              render={({ history }) => <SearchBox history={history} />}
            ></Route>
          )}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav style={{ marginLeft: "auto" }}>
              <LinkContainer to="/cart">
                <Nav.Link>
                  Cart
                  <i className="fas fa-shopping-cart" />
                </Nav.Link>
              </LinkContainer>

              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <NavDropdown.Item>
                    <Link to="/profile">Profile </Link>
                  </NavDropdown.Item>

                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    Sign In
                    <i className="fas fa-user" />
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="adminmenu">
                  <NavDropdown.Item>
                    <Link to="/admin/userlist">Users</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link to="/admin/productlist">Products</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link to="/admin/orderlist">Orders</Link>
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
