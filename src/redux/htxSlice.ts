import { createSlice } from "@reduxjs/toolkit";

export interface roleOfUser {
  id_hoptacxa: number;
  role: string;
}

export interface HasHTX {
  hasHTX: boolean;
  role: any;
}

const initialState: HasHTX = {
  hasHTX: false,
  role: localStorage.getItem("htx") || {},
};

const htxSlice = createSlice({
  name: "htx",
  initialState,
  reducers: {
    hasHTX(state, action) {
      state.hasHTX = action.payload;
    },
    setRole(state, action) {
      state.role = action.payload;
    },
    reset(state) {
      state.hasHTX = false;
      state.role = {};
    },
  },
});

//actions
export const { hasHTX, setRole, reset } = htxSlice.actions;

// reducer
export default htxSlice.reducer;
