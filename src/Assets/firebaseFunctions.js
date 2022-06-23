import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../Config/firebase.js";
import { get, ref, getDatabase, set, push} from "firebase/database";
import { getHoursAndMinutes } from "./utils.js";
const app = initializeApp(firebaseConfig);
const db = getDatabase();

export function get_chat(conversationPairStr) {
  return get(ref(db, `conversations/${conversationPairStr}/chat`));
}
export function send_message_to_chat(conversationPairStr, uid, message) {
  let chatRef = ref(
    db,
    `conversations/${conversationPairStr}/chat`
  );
  let newTalk = push(chatRef);
  set(newTalk, {
    at: getHoursAndMinutes(new Date().toString()),
    from: uid,
    message: message,
  });
}