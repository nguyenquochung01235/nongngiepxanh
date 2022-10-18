import { createSlice } from "@reduxjs/toolkit";

export interface AllPageLoading {
  isLoading: boolean;
}

const initialState: AllPageLoading = {
  isLoading: false,
};

const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    toggleLoading(state, action) {
      console.log(action.payload);

      state.isLoading = action.payload;
    },
  },
});

//actions
export const { toggleLoading } = loadingSlice.actions;

// reducer
export default loadingSlice.reducer;
