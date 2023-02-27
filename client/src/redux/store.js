import { configureStore } from "@reduxjs/toolkit";
import { AuthReducer } from "./slices/auth";
import { PostReducer } from "./slices/post";
import { UserReducer } from "./slices/user";

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    post: PostReducer,
    user: UserReducer,
  },
});
