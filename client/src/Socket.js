import { io } from "socket.io-client";
import { chatMessage, chatMessages } from "./redux/messages/slice.js";

export let socket;

export function init(store) {
    if (!socket) {
        socket = io();
        socket.on("chatMessages", (messages) => {
            console.log(messages, " from sockets");
            store.dispatch(chatMessages(messages));
        });

        socket.on("chatMessage", (message) => {
            console.log(message, " i am message");
            store.dispatch(chatMessage(message));
        });
    }
}
