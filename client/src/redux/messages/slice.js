export default function messagesReducer(state = null, action) {
    if (action.type === "chatMessagesRecieved") {
        state = action.payload;
    }
    if (action.type == "chatMessageRecieved") {
        console.log(state, action.payload);
        state = [...state, action.payload];
    }
    return state;
}
export function chatMessages(messages) {
    return {
        type: "chatMessagesRecieved",
        payload: messages,
    };
}

export function chatMessage(message) {
    return {
        type: "chatMessageRecieved",
        payload: message,
    };
}
