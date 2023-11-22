import { AnyAction, Dispatch, MiddlewareAPI } from "@reduxjs/toolkit";
import io from "socket.io-client";
import { addConversations, receiveMessage } from "../chat/chat.slice";

const chatAdvise = (store: MiddlewareAPI) => (next: Dispatch<AnyAction>) => {
  const token = window.localStorage.getItem("token");
  const socket = io(`${import.meta.env.VITE_GATEWAY_SOCKET}/advise`, {
    extraHeaders: {
      token: token || "",
    },
  });
  socket.emit("assign_socket", {});

  socket.on("assign_token", (_token) => {
    localStorage.setItem("token", _token);
  });

  socket.on("receive_message", (data) => {
    store.dispatch(receiveMessage(data));
  });

  socket.on("my_conversations", (data) => {
    store.dispatch(addConversations(data));
  });

  socket.on("someone_connect_to_room", (data) => {
    console.log(data);
  });

  socket.on("someone_leave_out_room", (data) => {
    console.log(data);
  });

  socket.on("someone_typing", () => {
    console.log("someone_typing");
  });

  return (action: AnyAction) => {
    switch (action.type) {
      case "chat/addMessage": {
        socket.emit("chat", {
          ...action.payload,
          token: localStorage.getItem("token"),
        });
        break;
      }
      case "chat/connectRoom": {
        socket.emit("connect_room", {
          ...action.payload,
          token: localStorage.getItem("token"),
        });
        break;
      }
      case "chat/typing": {
        socket.emit("typing", {
          ...action.payload,
          token: localStorage.getItem("token"),
        });
        break;
      }
    }
    return next(action);
  };
};

export default chatAdvise;
