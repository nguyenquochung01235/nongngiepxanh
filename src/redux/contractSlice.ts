import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchUser: undefined,
};

const contractSlice = createSlice({
  name: "contract",
  initialState,
  reducers: {
    searchUser(state, action) {
      state.searchUser = action.payload;
    },
  },
});

//actions
export const { searchUser } = contractSlice.actions;

// reducer
export default contractSlice.reducer;
