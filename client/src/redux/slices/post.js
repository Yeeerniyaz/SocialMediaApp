import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchGetPost = createAsyncThunk("post/fetchGetPost", async () => {
  const { data } = await axios.get("/post");
  return data;
});

export const fetchCreatePost = createAsyncThunk(
  "post/fetchCreatePost",
  async (params) => {
    const { data } = await axios.post("/post", params);
    return data;
  }
);

export const fetchDeletePost = createAsyncThunk(
  "post/fetchDeletePost",
  async (params) => {
    const { data } = await axios.delete(`/post/${params}`);
    return data;
  }
);

export const fetchCreateComment = createAsyncThunk(
  "post/fetchCreateComment",
  async ({ id, text }) => {
    const { data } = await axios.post(`/post/comment/${id}`, { text: text });
    return data;
  }
);

export const fetchdeleteComment = createAsyncThunk(
  "post/fetchDeleteComment",
  async ({ id, postId }) => {
    const { data } = await axios.delete(`/post/comment/${postId}/${id}`);
    return data;
  }
);

const initialState = {
  data: undefined,
  status: "loading",
};

const PostSlices = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (bulider) => {
    bulider
      .addCase(fetchCreatePost.fulfilled, (state, action) => {
        state.date = state.data.unshift(action.payload);
      })
      .addCase(fetchGetPost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchGetPost.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "loaded";
      })
      .addCase(fetchGetPost.rejected, (state) => {
        state.status = "error";
      })
      .addCase(fetchDeletePost.pending, (state, action) => {
        state.data = state.data.filter((obj) => obj._id !== action.meta.arg);
      })
      .addCase(fetchCreateComment.fulfilled, (state, action) => {
        state.data[
          state.data.findIndex(({ _id }) => _id === action.meta.arg.id)
        ].comments.unshift(action.payload.pop());
      });
  },
});

export const PostReducer = PostSlices.reducer;
