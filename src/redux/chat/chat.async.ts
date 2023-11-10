/* eslint-disable @typescript-eslint/no-explicit-any */
import MessageService from "@/services/messages";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchMessageByTarget = createAsyncThunk(
  "message/fetchByTarget",
  async (target: any) => {
    const messages = await MessageService.searchMessage({
      params: { target },
    });
    console.log(messages);
    // return {
    //   [target]: message,
    // };
  }
);
