import { configureStore } from "@reduxjs/toolkit";
import htxSlice from "../redux/htxSlice";
import loadingSlice from "../redux/loadingSlice";
import userSlice from "../redux/userSlice";

export const store = configureStore({
  reducer: {
    loading: loadingSlice,
    user: userSlice,
    htx: htxSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
