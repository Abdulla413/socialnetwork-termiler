import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { socket } from "./Socket.js";

export default function Chat() {
    const messages = useSelector((state) => state.messages);
    console.log(messages, " i am state from line 7");

    const contentContainer = useRef();

    useEffect(() => {
        contentContainer.current.scrollTop =
            contentContainer.current.scrollHeight -
            contentContainer.current.clientHeight;
    }, [messages]);

    return (
        <>
            <div className="content-container" ref={contentContainer}>
                {(messages || []).map((content) => (
                    <div className="singlechat" key={content.firstname}>
                        <div>
                            <img src={content.pic_url} alt={content.lastname} />
                            <div className="chaterlastname">
                                {content.lastname}
                            </div>
                        </div>
                        <div>
                            <p className="singlechat-p-tag">
                                {content.message}
                            </p>
                            <p className="chisla"> {content.created_at} </p>
                        </div>
                    </div>
                ))}
            </div>

            <div dir="rtl" className="chat-text-area">
                <textarea
                    placeholder="Enter the chat message here..."
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            socket.emit("chatMessage", e.target.value);
                            e.target.value = "";
                        }
                    }}
                ></textarea>
            </div>
        </>
    );
}
