import * as React from "react";
import { atom, useRecoilState, useRecoilValue } from "recoil";
import { useState, useEffect } from "react";
import { userState } from "./atoms/index";
import { firebaseConfig } from './Config/firebase.js';
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {beautify_name} from './Assets/utils.js';
import {getDatabase, ref, set, get} from 'firebase/database';


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
  const [_userState, _setUserState] = useRecoilState(userState);
  // Setting up firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth();
  const database = getDatabase();
  //////////////////////////////////////////////////////////////
  useEffect(()=>{
    if(_userState){console.log(_userState)}
  },[_userState])

  function logar() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        _setUserState(result);
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }



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
          {beautify_name(_userState?.user?.displayName)}
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          style={{ marginRight: "10px" }}
        />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#features">Features</Nav.Link>
          </Nav>
          <Nav style={{  }}>
            <NavDropdown align="end" title="Configurações" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.2">
                Minha conta
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Sair</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Excluir minha conta
              </NavDropdown.Item>
            </NavDropdown>
            
          </Nav>
        </Navbar.Collapse>
        {/* </Container> */}
      </Navbar>
      {!_userState.user ? ( // if user isn't logged yet.. then show him login window.
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          <Button onClick={() => { logar() }}></Button>
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
        <>
          <Chat style={{ display: 'flex', flex: '1', height: '100%' }} />
        </>
      )}
    </>
  );
}