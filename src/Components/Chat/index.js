import { useState, useEffect, useRef } from "react";
import { v4 as uuid } from "uuid";
import Draggable from "react-draggable";
import { FaArrowCircleRight } from "react-icons/fa";

export default function Chat() {
  const [conversation, setConversation] = useState([
    { key: uuid(), message: "Lorem ipsum " },
  ]);
  const chatDiv = useRef(null);
  const [entryText, setEntryText] = useState("");
  const [shouldScroll, setShouldScroll] = useState(false);
  async function conversationScrollSystem(ref) {
    console.log(ref.current);
    if(ref?.current){
      let scrollableList = ref?.current;
      if(scrollableList.top == (scrollableList.scrollHeight - scrollableList.clientHeight)){
        console.log('Tá no final..');
      }

    }
  }
  async function addText() {
    await setConversation((conversation) => [
      ...conversation,
      { key: uuid(), message: entryText },
    ]);
    setEntryText("");
    chatDiv?.current?.scrollTo({
      top: chatDiv.current.scrollHeight,
      behavior: "smooth",
    });
    // console.log(chatDiv.current);
  }
  // useEffect(() => {
  //   setInterval(() => {
  //     setConversation((conversation) => [
  //       ...conversation,
  //       {
  //         key: uuid().toString(),
  //         message:
  //           "Lorem ipsum dolor sit amet consectetur adipisicing elit. Error quibusdam molestias consectetur libero pariatur perferendis, magni nulla autem eos minus.",
  //       },
  //     ]);
  //     console.log(conversation);
  //   }, 5000);
  //   setInterval(() => {
  //     if (shouldScroll) {
  //       window.scrollTo({
  //         top: document.body.scrollHeight,
  //         behavior: "smooth",
  //       });
  //     }
  //   }, 1000);
  // }, []);

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
        onScroll={() => {conversationScrollSystem(chatDiv)}}
      >
        <div className="text-light text-center">
          <h1>{entryText}</h1>
        </div>
        <div>
          {conversation.map((i, key) => {
            return (
              <div
                key={key}
                id="chat-body"
                className={key % 2 == 0 ? "flex-right" : "flex-left"}
              >
                <div id="chat-content">
                  <div
                    id={key % 2 == 0 ? "chat-bubble-right" : "chat-bubble-left"}
                  >
                    {i.message}
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
