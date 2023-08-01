import React, { useContext, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { ContactContext } from "../../App";
import "./ChatPage.css";
export const ChatPage = () => {
  const data = useContext(ContactContext);
  const location = useLocation(); //useLocation hook of react-router to pass the data from link
  const { from } = location.state; //destructuring of data pass from links
  const [messages, setMessages] = useState({
    sentMsg: [],
    recMsg: [],
  });
  const msgRef = useRef();
  const messagesEndRef = useRef(null); //to move to end of the chat automatically
  const date = new Date(Date.now() - 2 * 60 * 1000 * 1000);
  let chats = JSON.parse(localStorage.getItem("Username"));
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };
  const handleSendMessage = (e) => {
    e.preventDefault();
    let usersUniqueId = `${chats.userId}/${from.id}`;
    let obj;
    obj = {
      timeStamp: date.toLocaleTimeString(),
      msg: msgRef.current.value,
    };
    messages.sentMsg.push(obj);
    setMessages({
      ...messages,
      sentMsg: [...messages.sentMsg],
    });
  };

  return (
    <div className="chat">
      <div className="chat__backdrop pt-4">
        <span className="chat__header">
          <span className="d-flex">
            <img
              className="rounded-circle"
              src={from.img}
              alt="..."
              style={{ height: "45px", width: "45px" }}
            />{" "}
            &nbsp;&nbsp;
            <span className="">
              {from.name}
              <br></br>
              {/* online */}
              <small className="text-muted">online</small>
            </span>
          </span>

          <input
            type="text"
            className="search-click"
            name=""
            placeholder="Search chats here...."
          />
        </span>
      </div>
      {/* display chat */}
      <div className="chat__page">
        {messages.sentMsg.length > 0
          ? messages.sentMsg.map((ele, index) => (
              <div className="chat__page__message mb-2" key={index}>
                <p className="pe-3">{ele.msg}</p>
                <p
                  className="text-muted float-end"
                  style={{ fontSize: "12px" }}
                >
                  {ele.timeStamp}
                </p>
              </div>
            ))
          : null}
        <div id="messagesEndRef" ref={messagesEndRef}></div>
      </div>
      {/* send message box */}
      <form
        className="d-flex input-group-lg send-message"
        onSubmit={handleSendMessage}
      >
        <input
          className="form-control form-control-lg"
          style={{ borderRadius: "25px", borderColor: "green" }}
          type="text"
          placeholder="Send message..."
          aria-label=".form-control-lg example"
          ref={msgRef}
        />
        <button
          className="btn btn-success ms-2"
          style={{ borderRadius: "50%" }}
        >
          <i
            class="fa fa-location-arrow"
            style={{ fontSize: "25px", color: "white" }}
          ></i>
        </button>
      </form>
    </div>
  );
};
