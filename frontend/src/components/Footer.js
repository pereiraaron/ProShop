import React from "react";
import { Navbar } from "react-bootstrap";
const Footer = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" style={{ padding: 0 }}>
      <Navbar.Brand
        style={{
          fontSize: "0.8em",
          margin: "0 auto",
        }}
      >
        {" "}
        Copyright &copy; PROSHOP
      </Navbar.Brand>
    </Navbar>
  );
};

export default Footer;
