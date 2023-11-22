/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Message, Prettify } from "@/utils/responseTypes";
import { fetchMessageByTarget } from "./chat.async";

export interface EChatState {
  conversations: any[];
  messages: Message[];
}
const initialState: EChatState = {
  conversations: [],
  messages: [],
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMessage: (
      state,
      action: PayloadAction<
        Partial<
          Prettify<Message & { file: string | null; target: string | null }>
        >
      >
    ) => {
      console.log(state, action);
    },
    receiveMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    },
    connectRoom: (
      state,
      action: PayloadAction<{
        target?: string;
        roomId?: string;
        token?: string;
      }>
    ) => {
      console.log(state, action);
    },
    addConversations: (state, action: PayloadAction<any[]>) => {
      state.conversations = action.payload;
    },
    leaveRoom: (state, action: PayloadAction<{ target: string }>) => {
      console.log(state, action);
    },
    typing: (_state, _action) => {},
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchMessageByTarget.fulfilled,
      (state, action: PayloadAction<Message[]>) => {
        state.messages = action.payload;
      }
    );
  },
});

export const {
  addMessage,
  receiveMessage,
  connectRoom,
  addConversations,
  typing,
} = chatSlice.actions;

export default chatSlice.reducer;
