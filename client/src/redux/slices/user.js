import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchFollowers = createAsyncThunk(
  "user/fetchFollowers",
  async () => {
    const { data } = await axios.get("/user/me/flwes");
    return data;
  }
);

export const fetchFollows = createAsyncThunk("user/fetchFollows", async () => {
  const { data } = await axios.get("/user/me/flws");
  return data;
});

export const fetchGetUser = createAsyncThunk(
  "user/fetchGetUser",
  async (params) => {
    const { data } = await axios.get(`/user/find/${params}`);
    return data;
  }
);

export const fetchGetPopular = createAsyncThunk(
  "user/fetchGetPopular",
  async (params) => {
    const { data } = await axios.get(`/user/popular`);
    return data;
  }
);

const initialState = {
  followers: {},
  follows: {},
  popular: {},
  getUser: {},
  status: {
    followers: "loading",
    follows: "loading",
    popular: "loading",
    getUser: "loading",
  },
};

const UserSlices = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (bulider) => {
    bulider // ! FOLLOWERS
      .addCase(fetchFollowers.pending, (state) => {
        state.followers = {};
        state.status.followers = "loading";
      })
      .addCase(fetchFollowers.fulfilled, (state, action) => {
        state.status.followers = "loaded";
        state.followers = action.payload;
      })
      .addCase(fetchFollowers.rejected, (state) => {
        state.status.followers = "error";
        state.followers = state.followers || [];
      }) // ! FOLLOWS
      // .addCase(fetchFollows.pending, (state) => {
      //   state.data = [];
      //   state.status = "loading";
      // })
      // .addCase(fetchFollows.fulfilled, (state, action) => {
      //   state.status = "loaded";
      //   state.data = action.payload;
      // })
      // .addCase(fetchFollows.rejected, (state) => {
      //   state.status = "error";
      //   state.data = state.data || [];
      // }) // ! GET USER
      // .addCase(fetchGetUser.pending, (state) => {
      //   state.data = [];
      //   state.status = "loading";
      // })
      .addCase(fetchGetUser.fulfilled, (state, action) => {
        state.status.getUser = "loaded";
        state.getUser = action.payload;
      })
      // .addCase(fetchGetUser.rejected, (state) => {
      //   state.status = "error";
      //   state.data = state.data || [];
      // }) // ! GET POPULARITY
      // .addCase(fetchGetPopular.pending, (state) => {
      //   state.data = [];
      //   state.status = "loading";
      // })
      // .addCase(fetchGetPopular.fulfilled, (state, action) => {
      //   state.status = "loaded";
      //   state.data = action.payload;
      // })
      // .addCase(fetchGetPopular.rejected, (state) => {
      //   state.status = "error";
      //   state.data = state.data || [];
      // });
  },
});

export const UserReducer = UserSlices.reducer;
