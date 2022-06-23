import { useState, useEffect, useRef } from "react";
import { v4 as uuid } from "uuid";
import Draggable from "react-draggable";
import { FaArrowCircleRight } from "react-icons/fa";
import { getAuth, signInWithPopup } from "firebase/auth";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { app } from "../../Config/firebase.js";
import useSound from "use-sound";
import { actualConversation, userState } from "../../atoms/index.js";
import { useRecoilState } from "recoil";
import bubbleSound from "../../Assets/sounds/bubble-sound.wav";
import { getHoursAndMinutes, capitalize } from "../../Assets/utils.js";
import CryptoJS from "react-native-crypto-js";
import { get_chat, send_message_to_chat } from "../../Assets/firebaseFunctions.js";


export default function Chat() {
  const [playSound] = useSound(bubbleSound, { volume: 0.1 });
  const [_actualConversation, _setActualConversation] = useRecoilState(actualConversation);
  const [_userState, setUserState] = useRecoilState(userState);
  const [chat, setChat] = useState();
  const chatDiv = useRef(null);
  const [entryText, setEntryText] = useState("");
  const [shouldScroll, setShouldScroll] = useState(false);
  const db = getDatabase();

  useEffect(() => {
    let conversationRef = ref(db, 'conversations/'+ _actualConversation.conversationPair + '/chat');
    onValue(conversationRef, snapshot => {
      snapshot.exists() && setChat(Object.values(snapshot.val()));

    })
    // get_chat(_actualConversation.conversationPair).then((data)=>{
    //   console.log(data.val());
    // })
  }, []);
  useEffect(() => {
    playSound();
    let encryptedMessage = CryptoJS.AES.encrypt(
      "this is the secret message.",
      "music4ever"
    ).toString();
    console.log(
      CryptoJS.AES.decrypt(encryptedMessage, "music4ever").toString(
        CryptoJS.enc.Utf8
      )
    );
  }, [chat]);
  async function conversationScrollSystem(ref) {
    if (ref?.current) {
      let scrollableList = ref?.current;
      if (
        scrollableList.top ==
        scrollableList.scrollHeight - scrollableList.clientHeight
      ) {
        console.log("Tá no final..");
      }
    }
  }
  async function addText(){
    send_message_to_chat(_actualConversation.conversationPair,_userState.uid, entryText);
  }
  // async function addText() {
  //   if (chat === undefined) {
  //     await setChat((chat) => [
  //       { message: entryText, date: new Date().toString() },
  //     ]);
  //   } else {
  //     await setChat((chat) => [
  //       ...chat,
  //       { message: entryText, date: new Date().toString() },
  //     ]);
  //     chatDiv?.current?.scrollTo({
  //       top: chatDiv.current.scrollHeight,
  //       behavior: "smooth",
  //     });
  //     console.log(chatDiv.current);
  //   }
  //   setEntryText("");
  // }

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
        onScroll={() => {
          conversationScrollSystem(chatDiv);
        }}
      >
        <div className="text-light text-center">
          <h1>{entryText}</h1>
        </div>
        <div id="bubblesDiv">
          {chat && chat.map((i, key) => {
            return (
              <div
                key={key}
                id="chat-body"
                className={i.from === _userState.uid ? "flex-right" : "flex-left"}
              >
                <div id="chat-content">
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignSelf: "center",
                    }}
                    id={i.from === _userState.uid ? "chat-bubble-right" : "chat-bubble-left"}
                  >
                    {capitalize(i?.message)}
                    <div
                      id="chat-time"
                      style={{ color: "white", alignSelf: "flex-end" }}
                    >
                      {i?.at}
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
