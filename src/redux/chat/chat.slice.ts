/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Message, Prettify } from "@/utils/responseTypes";
import { fetchMessageByTarget } from "./chat.async";

export interface EChatState {
  advises: Message[];
  conversations: any[];
  messages: { [key: string]: Message[] };
}
const initialState: EChatState = {
  advises: [],
  conversations: [],
  messages: {},
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
      state.advises.push(action.payload);
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
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMessageByTarget.fulfilled, (state, action) => {
      state.messages = {
        ...state.messages,
        ...action.payload,
      };
    });
  },
});

export const { addMessage, receiveMessage, connectRoom, addConversations } =
  chatSlice.actions;

export default chatSlice.reducer;
