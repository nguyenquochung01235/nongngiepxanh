import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  count: 0,
  notification: [],
  isReadAll: false,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    addNotification(state, action) {
      state.notification = action.payload;
      state.count = state.count + 1;
    },
    resetCount(state) {
      state.count = 0;
    },
    setIsReadAll(state, action) {
      state.isReadAll = action.payload;
    },
  },
});

//actions
export const { addNotification, resetCount, setIsReadAll } =
  notificationSlice.actions;

// reducer
export default notificationSlice.reducer;
