import {
  BsFillChatSquareFill,
  BsCheckCircle,
  BsDashCircle,
} from "react-icons/bs";
import { primary, secondary } from "../../Assets/colors";
import { FcLike } from "react-icons/fc";
import { actualConversation, userState } from "../../atoms/index.js";
import { useRecoilState } from "recoil";
import { ref, set, get, getDatabase, push } from "firebase/database";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../Config/firebase";
import { getHoursAndMinutes } from "../../Assets/utils";
import { get_chat } from "../../Assets/firebaseFunctions";
import "./index.css";
import { useEffect, useState } from "react";
export function Card(props) {
  const app = initializeApp(firebaseConfig);
  const db = getDatabase();
  const [_userState, _setUserState] = useRecoilState(userState);
  const [_actualConversation, _setActualConversation] = useRecoilState(actualConversation);
  function start_chat(uid) {
    if (_userState.uid) {
      let conversationPair = [_userState.uid, uid].sort();
      let convertedConversationPair =
        conversationPair[0] + "-" + conversationPair[1];
      get(ref(db, "conversations/" + convertedConversationPair)).then(
        (snapshot) => {
          if (!snapshot.exists()) {
            //  This conversation doesn't exist, so we have to create it.
            set(ref(db, "conversations/" + convertedConversationPair), {
              user1: conversationPair[0],
              user2: conversationPair[1],
            }).then(()=>{
              _setActualConversation({
                conversationPair: convertedConversationPair,
                user1: conversationPair[0],
                user2: conversationPair[1]
              })
            });
          } else {
            _setActualConversation({
              conversationPair: convertedConversationPair,
              user1: conversationPair[0],
              user2: conversationPair[1]
            })
            // let chatRef = ref(
            //   db,
            //   "conversations/" + convertedConversationPair + "/chat"
            // );
            // let newTalk = push(chatRef);
            // set(newTalk, {
            //   at: getHoursAndMinutes(new Date().toString()),
            //   from: conversationPair[0],
            //   message: "blablablablabla",
            // });
          }
        }
      );
    } else {
      alert(
        "Você ainda não está logado, portanto não pode começar uma conversa."
      );
    }
  }
  return (
    <>
      <div className="main">
        <div className="row1">
          <>{props.username || "Undefined Username."}</>
        </div>
        <div className="row2">
          {props.picture ? (
            <img className="profilePicture" src={props.picture} />
          ) : (
            <div className="undefinedPicture">Undefined user picutre.</div>
          )}
        </div>
        <div className="row3">
          <div className="favorite">
            <FcLike />
          </div>
          <div
            className="chat"
            onClick={() => {
              start_chat(props.uid);
            }}
          >
            <BsFillChatSquareFill /> Chat
          </div>
          <div className="status">
            {props.status === "online" ? (
              <>
                <BsCheckCircle className="onlineIcon" /> Online
              </>
            ) : (
              <>
                <BsDashCircle className="offlineIcon" /> Offline
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
