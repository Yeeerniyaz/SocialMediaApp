import { configureStore } from "@reduxjs/toolkit";
import { AuthReducer } from "./slices/auth";
import { PostReducer } from "./slices/post";

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    post: PostReducer,
  },
});
