import { useState, useEffect, useRef } from "react";
import { v4 as uuid } from "uuid";
import Draggable from "react-draggable";
import { FaArrowCircleRight } from "react-icons/fa";
import { getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../../Config/firebase.js";
import useSound from "use-sound";
import bubbleSound from "../../Assets/sounds/bubble-sound.wav";
import { getHoursAndMinutes, capitalize } from "../../Assets/utils.js";
import CryptoJS from "react-native-crypto-js";
//https://www.npmjs.com/package/hybrid-crypto-js



export default function Chat() {
  
  const [playSound] = useSound(bubbleSound, { volume: 0.1 });
  const [conversation, setConversation] = useState([
    { key: uuid(), message: "Lorem ipsum " },
  ]);
  const chatDiv = useRef(null);
  const [entryText, setEntryText] = useState("");
  const [shouldScroll, setShouldScroll] = useState(false);

  useEffect(() => { playSound(); console.log(conversation);
  console.log(CryptoJS.AES.encrypt('This is the password i am trying to encrypt', 'music4ever').toString()) }, [conversation])
  async function conversationScrollSystem(ref) {
    if (ref?.current) {
      let scrollableList = ref?.current;
      if (scrollableList.top == (scrollableList.scrollHeight - scrollableList.clientHeight)) {
        console.log('Tá no final..');
      }

    }
  }
  async function addText() {
    await setConversation((conversation) => [
      ...conversation,
      { message: entryText, date: new Date().toString() },
    ]);
    setEntryText("");
    chatDiv?.current?.scrollTo({
      top: chatDiv.current.scrollHeight,
      behavior: "smooth",
    });
    // console.log(chatDiv.current);
  }


  return (
    <>
      <div
        ref={chatDiv}
        id="chat"
        style={{
          flex: 1,
          overflowY: "scroll",
          height: "85vh",
          width: "100vw",
          overflowX: "hidden",
        }}
        onScroll={() => { conversationScrollSystem(chatDiv) }}
      >
        <div className="text-light text-center">
          <h1>{entryText}</h1>
        </div>
        <div id="bubblesDiv">
          {conversation.map((i, key) => {
            return (
              <div
                key={key}
                id="chat-body"
                className={key % 2 == 0 ? "flex-right" : "flex-left"}
              >
                <div id="chat-content">
                  <div style={{display: 'flex', flexDirection: 'column', alignSelf: 'center'}}
                    id={key % 2 == 0 ? "chat-bubble-right" : "chat-bubble-left"}
                  >
                    {capitalize(i.message)}
                    <div id="chat-time" style={{ color: 'white', alignSelf: 'flex-end' }}>
                      {getHoursAndMinutes(i?.date)}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div
          style={{
            display: "flex",
            width: "100vw",
            position: "absolute",
            bottom: 0,
            padding: "10px",
            left: 0,
            right: 0,
            margin: "0 auto",
            backgroundColor: "#04293a",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <input
            value={entryText}
            onChange={(e) => {
              setEntryText(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addText();
              }
            }}
            spellCheck="false"
            autoCapitalize="true"
            style={{ width: "80vw", marginRight: "20px" }}
            type="text"
          />
          <FaArrowCircleRight
            onClick={() => {
              addText();
            }}
            className="growable"
            style={{ height: "30px", width: "30px", color: "white" }}
          />
        </div>
      </div>
    </>
  );
}
