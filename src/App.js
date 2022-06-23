import * as React from "react";
import { atom, useRecoilState, useRecoilValue } from "recoil";
import { useState, useEffect } from "react";
import { userState, actualConversation } from "./atoms/index";
import { firebaseConfig } from "./Config/firebase.js";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { beautify_name } from "./Assets/utils.js";
import { User } from "./Assets/structures.js";
import { getDatabase, ref, set, get, child } from "firebase/database";
import { Card } from "./Components/Card/index.js";

import {
  Navbar,
  Container,
  NavDropdown,
  Nav,
  Button,
  Col,
  Row,
} from "react-bootstrap";
import Draggable from "react-draggable";
import Chat from "./Components/Chat/index";

export default function App() {
  const [_userState, _setUserState] = useRecoilState(userState);
  const [_actualConversation, _setActualConversation] = useRecoilState(actualConversation);
  const [users, setUsers] = useState([]);
  // Setting up firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth();
  const database = getDatabase();
  const databaseRef = ref(database);
  const usersRef = ref(database, "users");
  //////////////////////////////////////////////////////////////
  useEffect(() => {
    get(usersRef).then((snapshot) => {
      for (const item of Object.entries(snapshot.val())) {
        setUsers((prev) => [...prev, item[1]]);
      }
    });
  }, []);
  useEffect(() => {
    users.map((i) => console.log(i));
  }, [users]);
  useEffect(() => {
    if (_userState) {
      console.log(_userState);
    }
  }, [_userState]);

  async function logar() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        let _user = new User(result);
        get(ref(database, "users/" + result.user.uid)).then((snapshot) => {
          if (!snapshot.exists()) {
            set(ref(database, "users/" + result.user.uid), _user).then(() => {
              _setUserState(_user);
            });
          } else {
            console.log("User's already created.");
            _setUserState(_user);
          } // Snapshot doesnt exist, then it means we have to create it on db.
        });

        // ...
      })
      .catch((error) => {
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
          {_userState.beautifulName}
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          style={{ marginRight: "10px" }}
        />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#features">Features</Nav.Link>
          </Nav>
          <Nav style={{}}>
            <NavDropdown
              align="end"
              title="Configurações"
              id="collasible-nav-dropdown"
            >
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
      {_actualConversation ? ( // if user isn't logged yet.. then show him login window.
        <Chat style={{ display: "flex", flex: "1", height: "100%" }} />
      ) : (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              flexWrap: "wrap",
              flexShrink: 0,
            }}
          >
            <Button
              onClick={() => {
                logar();
              }}
            >
              Logar
            </Button>
            {users &&
              users.map((user) => {
                return (
                  <Card
                    picture={user.photoUrl}
                    username={user.beautifulName}
                    uid={user.uid}
                  ></Card>
                );
              })}
          </div>
        </>
      )}
    </>
  );
}
