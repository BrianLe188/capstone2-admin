/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Message, Prettify } from "@/utils/responseTypes";

export interface EChatState {
  advises: Message[];
  conversations: any[];
}
const initialState: EChatState = {
  advises: [],
  conversations: [],
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
      // const { type, content, sender, room } = action.payload;
      // state.advises.push({ type, content, sender, room });
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
  },
});

export const { addMessage, receiveMessage, connectRoom, addConversations } =
  chatSlice.actions;

export default chatSlice.reducer;
