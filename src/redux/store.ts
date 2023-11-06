import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "./chat/chat.slice";
import chatAdvise from "./middlewares/chat-advise.middleware";

export const store = configureStore({
  reducer: {
    chat: chatReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(chatAdvise),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
