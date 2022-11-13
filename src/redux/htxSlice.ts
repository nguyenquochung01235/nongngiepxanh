import { createSlice } from "@reduxjs/toolkit";

export interface roleOfUser {
  id_hoptacxa: number;
  role: string;
}

export interface HasHTX {
  hasHTX: boolean;
  role: any;
  isChairman?: any;
}

const initialState: HasHTX = {
  hasHTX: false,
  role: localStorage.getItem("htx") || {},
  isChairman: false,
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
    isChairman(state, action) {
      state.isChairman = action.payload;
    },
    reset(state) {
      state.hasHTX = false;
      state.role = {};
    },
  },
});

//actions
export const { hasHTX, setRole, reset, isChairman } = htxSlice.actions;

// reducer
export default htxSlice.reducer;
