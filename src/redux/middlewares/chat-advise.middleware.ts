import { AnyAction, Dispatch, MiddlewareAPI } from "@reduxjs/toolkit";
import io from "socket.io-client";
import { receiveMessage } from "../chat/chat.slice";

const chatAdvise = (store: MiddlewareAPI) => (next: Dispatch<AnyAction>) => {
  const token = window.localStorage.getItem("token");
  const socket = io(`${import.meta.env.VITE_GATEWAY_SOCKET}/advise`, {
    extraHeaders: {
      token: token || "",
    },
  });

  socket.emit("assign_socket", {});

  socket.on("assign_token", (_token) => {
    if (!token) {
      localStorage.setItem("token", _token);
    }
  });

  socket.on("receive_message", (data) => {
    store.dispatch(receiveMessage(data));
  });

  socket.on("my_conversations", (data) => {
    console.log(data);
  });

  return (action: AnyAction) => {
    switch (action.type) {
      case "chat/addMessage": {
        socket.emit("chat", action.payload);
        break;
      }
      case "chat/connectRoom": {
        socket.emit("connect_room", action.payload);
        break;
      }
    }
    return next(action);
  };
};

export default chatAdvise;
