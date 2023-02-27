import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchAuth = createAsyncThunk("auth/fetchAuth", async () => {
  const { data } = await axios.get("/auth");
  return data;
});

export const fetchLogin = createAsyncThunk(
  "auth/fetchLogin",
  async (params) => {
    const { data } = await axios.post("/auth/login", params);

    return data;
  }
);

export const fetchRegister = createAsyncThunk(
  "auth/fetchRegister",
  async (params) => {
    const { data } = await axios.post("/auth/register", params);
    return data;
  }
);

export const fetchUpdate = createAsyncThunk(
  "auth/fetchUpdate",
  async (params) => {
    const { data } = await axios.post("/auth/update", params);
    return data;
  }
);

export const fetchUpdatePassword = createAsyncThunk(
  "auth/fetchUpdatePassword",
  async (params) => {
    const { data } = await axios.post("/auth/password", params);
    return data;
  }
);

export const fetchAddFollow = createAsyncThunk(
  "fetchAddFollow",
  async (params) => {
    const { data } = await axios.patch(`/user/i/${params}`);
    return data;
  }
);

export const fetchRemoveFollow = createAsyncThunk(
  "auth/fetchRemoveFollow",
  async (params) => {
    const { data } = await axios.patch(`/user/un/${params}`);
    return data;
  }
);

const initialState = {
  data: null,
  status: "loading",
};

const AuthSlices = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
    },
    addPost: (state, params) => {
      state.data.posts.unshift(params);
    },
    removePost: (state, params) => {
      state.data.posts = state.data.posts.filter((post) => post._id === params);
    },
  },
  extraReducers: (bulider) => {
    bulider
      // !	fetchAuth // // // // // // // // // // // //////////////////////////////////
      .addCase(fetchAuth.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAuth.fulfilled, (state, action) => {
        state.status = "loaded";
        state.data = action.payload;
      })
      .addCase(fetchAuth.rejected, (state) => {
        state.status = "error";
      })
      // !	fetchRegister // // // // // // // // // // // //////////////////////////////
      .addCase(fetchRegister.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRegister.fulfilled, (state, action) => {
        state.status = "loaded";
        state.data = action.payload.user;
      })
      .addCase(fetchRegister.rejected, (state) => {
        state.status = "error";
      })
      // !	fetchLogin // // // // // // // // // // // //////////////////////////////////
      .addCase(fetchLogin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.status = "loaded";
        state.data = action.payload.user;
      })
      .addCase(fetchLogin.rejected, (state) => {
        state.status = "error";
      })
      // !	fetchUpdate // // // // // // // // // // // //////////////////////////////////
      .addCase(fetchUpdate.fulfilled, (state, action) => {
        state.status = "loaded";
        state.data = action.data;
      })
      // !	fetchUpdatePassword // // // // // // // // // // // /////////////////////////
      .addCase(fetchUpdatePassword.fulfilled, (state, action) => {
        state.status = "loaded";
        state.data = action.data;
      })
      .addCase(fetchAddFollow.pending, (state, action) => {
        state.data.follows.push(action.meta.arg);
      })
      .addCase(fetchRemoveFollow.pending, (state, action) => {
        state.data.follows = state.data.follows.filter(
          (follow) => follow !== action.meta.arg
        );
      });
  },
});

export const AuthReducer = AuthSlices.reducer;
export const { logout } = AuthSlices.actions;
export const { addPost } = AuthSlices.actions;
export const { removePost } = AuthSlices.actions;
export const SelectIsAuth = (state) => Boolean(state.auth.data);
