import * as React from "react";
import { atom, useRecoilState } from "recoil";
import { useState, useEffect } from "react";
import { loginState } from "./atoms/index";
import {
  Navbar,
  Container,
  NavDropdown,
  Nav,
  Card,
  Button,
  Col,
  Row,
} from "react-bootstrap";
import Draggable from "react-draggable";
import Chat from "./Components/Chat/index";

export default function App() {
  const [isLogged, setIsLogged] = useRecoilState(loginState);
  return (
    <>
      <Navbar
        sticky="top"
        collapseOnSelect
        expand="lg"
        bg="dark"
        variant="dark"
      >
        {/* <Container> */}
        <Navbar.Brand href="#home" style={{ marginLeft: "10px" }}>
          React-Bootstrap
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          style={{ marginRight: "10px" }}
        />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav style={{ marginLeft: "10px" }} className="me-auto">
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
            <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav style={{ marginLeft: "10px" }}>
            <Nav.Link href="#deets">More deets</Nav.Link>
            <Nav.Link eventKey={2} href="#memes">
              Dank memes
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        {/* </Container> */}
      </Navbar>
      {isLogged ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(() => {
            return (
              <>
                <Draggable>
                  <Card
                    bg="dark"
                    className="text-light"
                    style={{ width: "18rem" }}
                  >
                    <Card.Img
                      className="undraggable"
                      variant="top"
                      src="https://pbs.twimg.com/media/D-F5tEEXoAEul3-.png"
                    />
                    <Card.Body>
                      <Card.Title>Card Title</Card.Title>
                      <Card.Text>
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                      </Card.Text>
                      <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                  </Card>
                </Draggable>
              </>
            );
          })}
        </div>
      ) : (
        
        <Chat style={{display: 'flex', flex: '1', height: '100%'}}/>
      )}
    </>
  );
}
