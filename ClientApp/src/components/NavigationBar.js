import React from "react";
import { Nav, Navbar } from "react-bootstrap";

export const NavigationBar = () => (
  <Navbar bg="light" variant="light">
    <Navbar.Brand href="/">Mensa</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="/">Hlavní stránka</Nav.Link>
      <Nav.Link href="/subjects">Předměty</Nav.Link>
    </Nav>
  </Navbar>
);
