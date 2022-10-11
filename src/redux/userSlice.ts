import { createSlice } from "@reduxjs/toolkit";

export interface User {
  fullname: string;
  email: string;
  phone_number: string;
  address: string;
  dob: string;
  active: number;
  [key: string]: any;
}

export interface UserResponse {
  user?: User;
  access_token?: string;
}

let user = localStorage.getItem("user_luanvan") || (undefined as any);
if (user) {
  user = JSON.parse(user);
}

const initialState: UserResponse = {
  user,
  access_token: localStorage.getItem("access_token_luanvan") || undefined,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    storeUser(state, action) {
      state.user = action.payload.user;
      state.access_token = action.payload.access_token;
    },
  },
});

//actions
export const { storeUser } = userSlice.actions;

// reducer
export default userSlice.reducer;
